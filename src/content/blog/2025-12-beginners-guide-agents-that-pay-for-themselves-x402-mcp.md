---
title: "Beginner’s Guide: Agents That Pay for Themselves — X402, MCP, and On-Chain Actions in Chat"
description: "Imagine an agent that doesn’t just “call this API” or “hit that backend” for you, but also pays along the way: 0.01 USDC for a full article, a small amount for an…"
date: 2025-12-05
author: "andr3a5"
tags: [ "mcp-ui", "x402", "mcp-protocol", "llm" ]
featured: true
draft: false
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://medium.com/@a6b8/beginners-guide-agents-that-pay-for-themselves-x402-mcp-and-on-chain-actions-in-chat-4439d7b7b52c"
---

*Originally published on [Medium](https://medium.com/@a6b8/beginners-guide-agents-that-pay-for-themselves-x402-mcp-and-on-chain-actions-in-chat-4439d7b7b52c) on December 5, 2025.*

Imagine an agent that doesn’t just “call this API” or “hit that backend” for you, but also pays along the way: 0.01 USDC for a full article, a small amount for an on-chain action, a fee for a complex data query — all directly from within the conversation.

That’s the direction the combination of **X402**, **MCP**, and **MCP Apps** is moving toward. X402 adds a payment channel based on HTTP 402 and USDC signatures, MCP defines how agents talk to your tools in a structured way, and MCP Apps let you render small HTML interfaces right inside the chat when you need them.

It’s December 2025; there are already X402 hackathons on chains like Avalanche and Cronos. It’s a good moment to look at how these pieces fit together — and where you can realistically start.

## X402 in plain language: Exact, Deferred — and who pays gas

The core idea behind X402: an HTTP endpoint can respond with `402 Payment Required` and effectively say:

> *“This action costs 0.01 USDC — if you pay, I’ll continue.”*

A typical flow looks like this:

1. A client (often an MCP proxy or an agent) calls a tool or endpoint.
2. The server responds with 402 and a payment object: amount, token (USDC), chain, recipient, validity, and scheme.
3. The client signs an EIP-712 message, attaches it as X-PAYMENT, and repeats the same request.
4. The server verifies the signature and payment, then returns the real response.

## Exact: one action, one price — gas paid by the relayer

In the **Exact** scheme, the relationship is straightforward: one action, one fixed price. For example:

> *“This article costs 0.01 USDC.” “This level-up costs 0.02 USDC.”*

Technically, this is usually built on **EIP-3009 — Transfer with Authorization**: The user signs an off-chain EIP-712 message like “transfer X USDC from address A to address B, valid until time T.”

The important question is *who* submits the transaction:

- The signed authorization can be submitted on-chain by a third party — typically your backend or a dedicated relayer.
- That submitter pays the gas costs in the native token of the chain (e.g., ETH, AVAX, CRO).
- The user doesn’t need gas tokens; they just need USDC in their wallet.

This is exactly what EIP-3009 was designed for: delegate gas to a relayer who is compensated via fees or margin; from the user’s perspective it’s a single signature step, no manual gas management.

In practice, this Exact scheme is mature enough by late 2025 to use in real applications.

## Deferred: many small calls, settled later as a batch

The **Deferred** scheme flips the perspective:

- The server delivers content immediately.
- The client signs usage receipts (also EIP-712 structures).
- Those receipts are later batched into one or a few payments.

This is particularly interesting for GraphQL and subgraph workloads: lots of tiny queries that are too small to justify individual on-chain transactions, but matter in the aggregate. Teams like Edge & Node are working on a Deferred payment scheme built on X402 to bill subgraph access efficiently without flooding the network with microtransactions.

As of December 2025:

- Deferred is well described conceptually,
- early implementations exist,
- but it’s not as standardized or battle-tested as Exact.

It’s better suited for experiments and early-adopter projects than for conservative production systems right now.

## Shared foundation: signature and address

Under the hood, Exact and Deferred do the same kind of thing:

- The client signs an EIP-712 message.
- From that signature you can recover a concrete address and verify the signature.

You always get two things:

1. a payment or a strong payment proof,
2. an address that the signer demonstrably controls.

What you *don’t* get is a general mandate to execute arbitrary DeFi actions on behalf of that address. EIP-3009 authorizes token transfers, not arbitrary `call`s into other contracts. Additional on-chain steps (swaps, votes, etc.) must be separate transactions from your server, relayer, or a dedicated contract.

Still, that core — **structured payment + reliable address** — is the anchor point for most of the more advanced on-chain scenarios.

## MCP: from probabilistic model to deterministic interface

While X402 answers *who* pays and with which key, **MCP (Model Context Protocol)** defines how an agent talks to your system.

You describe your environment in three categories:

- tools with names, parameters, and descriptions
- resources (e.g., files, databases, subgraphs)
- prompts (roles, workflows, pipelines)

To the LLM, a tool looks like a function with explicit input and output schemas.

The key point: MCP is your **adapter** between a probabilistic model and a deterministic system.

- With meaningful tool names you steer which tool is picked in which situation.
- Structured parameters (often validated with Zod or similar libraries) define what you accept as valid input.
- Tool granularity determines how many steps you take away from the model and handle yourself.

An on-chain example:

In the Ethereum ecosystem, contracts are described with an **ABI** — a list of functions and their parameters. To resolve an ENS name to an address and then fetch NFTs for that address, you typically need several ABI calls and some off-chain logic.

A conventional API might expose multiple endpoints for this workflow. With MCP you can encapsulate everything in a single tool, such as:

> `resolve_ens_and_fetch_nfts`* Input: ENS name or address. Output: sorted list of NFTs with metadata.*

The internal complexity stays in your server; for the LLM, it’s one stable function call.

Together with X402, that’s particularly valuable: you can declare in the tool schema exactly which information you require from the model — limits, confirmations, context — before you even consider accepting a payment or triggering an on-chain action. The path from “rough idea in natural language” to “concrete, validated operation” becomes much more reliable.

## MCP Apps: HTML views in chat — as much UI as needed, no more

**MCP Apps** extend MCP with a UI layer. An MCP server can declare **UI resources** that are embedded into the host (e.g. a chat client) as full HTML views.

Technically, these views run in a secure “double-iframe” setup: a sandbox iframe that itself contains the actual app iframe.

For you, that means: anything you can build as a modern HTML5 app — forms, tables, file uploads, previews — can, in principle, appear directly inside the chat, as long as the host allows it.

There are two common ways to use this:

- full flows where every step should be visible — for example, a multi-step Shopify-style checkout where products, cart, confirmation, and receipt are each their own view
- minimal views only for critical points, while everything else is just text or structured data — for example, a concise summary with a single “Pay now” button

You’re not required to build UI for everything. Your MCP server can expose views for some tools and data-only responses for others. The host can choose if and how to render those views.

This opens the door to rethinking classic web flows. An eBay-like use case might look like this:

- a user takes a photo with their phone
- an agent generates the category, description, and a suggested price
- an MCP App view shows image, description, and price for confirmation
- with one click, the listing is created, and X402 charges a small USDC fee for posting it

Especially in combination with agents and X402, upload and listing flows can become much faster and simpler than with traditional multi-page forms.

## Async tasks, GraphQL, and Deferred: where this could go

Newer versions of the MCP core support **async tasks**: a tool call doesn’t have to do everything in a single step. It can respond with a **task ID** and continue the work later.

A typical pattern:

- a tool starts a long-running operation and immediately responds with task_id and status processing
- the client later calls another tool or endpoint to check the status and retrieve the result

This aligns very well with the idea of running many GraphQL or subgraph queries and billing them via **Deferred payments**:

- your MCP server starts multiple queries as tasks
- the client gets early feedback and can already build a partial answer
- in parallel, the user signs Deferred receipts for these queries, which are later batched into a single payment

In terms of timing, both async tasks and dedicated Deferred payment schemes are evolving quickly at the end of 2025. The combination is conceptually strong, but more of a 2026-prototype topic than the foundation of a first, stable production system.

## Two core patterns: priced services and controlled on-chain interactions

Most X402 + MCP ideas fall into two broad patterns:

- pricing digital services and data — with no on-chain state of your own
- controlling on-chain interactions — using an address you’ve authenticated via X402

## Pattern 1: Pricing digital services and data directly in chat

Suppose your MCP server provides articles, analyses, or data:

- list_articles returns a list with metadata
- get_article_preview returns a teaser and basic info
- get_article_full is paid

An agent uses these tools, shows a neat list with previews and prices via an MCP App view, and fetches the full text when requested.

As soon as `get_article_full` is called, your server responds not with the content, but with `402` and a payment object (Exact scheme). The client obtains an EIP-712 / EIP-3009 signature, sends it as `X-PAYMENT`, and your backend or facilitator covers gas and processes the payment. Only then do you return the full article.

The MCP layer is not just “nice” plumbing. It’s useful in concrete ways:

- you can define exactly which parameters you need for a paid operation (scope, limits, time ranges, etc.)
- you strictly validate the tool call before triggering any payment
- you can hide several internal REST or GraphQL calls behind a single tool and present a deterministic, stable surface to the LLM

If, at some point, you want to bill a very large number of small queries, you can evolve the same pattern with Deferred, collecting usage receipts instead of paying each call individually.

## Pattern 2: On-chain interactions via a verified key

In the second pattern, you lean more heavily on the fact that each X402 interaction gives you a **specific address** that has signed an EIP-712 message.

From your system’s perspective, that means: “This address authorized this request and (in the Exact case) has paid.”

You can then orchestrate on-chain logic for that address — using your keys and contracts, but with a clear mapping back to the user.

A concrete example: **dynamic NFTs**.

- on-chain, you have a relatively simple NFT contract with an ABI (e.g., mint, setTokenURI, some state functions)
- your MCP server wraps these functions as tools and adds off-chain logic for XP, levels, story progress, or state checks
- tools like evolve_character, claim_reward, or upgrade_ticket represent multiple ABI calls plus extra calculation in a single step

From the user’s point of view:

1. an MCP App view shows the NFT’s status and available actions
2. an action triggers a tool call; the server responds with 402 if it’s a paid action
3. after successful payment, you compute the new off-chain state, run the relevant on-chain updates, and send the updated status back

The same pattern works for DeFi:

- the contract ABI exposes low-level functions such as deposit, withdraw, rebalance
- your MCP tool groups them into a higher-level action like rebalance_portfolio
- X402 ensures you can charge a small USDC service fee for each operation and tie it to a concrete address

Again, the value comes from the combination:

- MCP ensures the LLM provides structured, complete, and validated input before anything sensitive happens
- X402 gives you a cryptographically proven address and the corresponding payment

Together, you get a foundation to automate on-chain actions more aggressively, without forcing users to click through every transaction in a wallet popup.

## Getting started — and reusing existing building blocks

Here’s a practical way to start without trying to implement everything at once.

1. Begin with MCP / MCP Apps, without payments Build an MCP server with a few tools and, where it makes sense, a single HTML view. The goal is to reshape your existing APIs and ABIs so an LLM can use them reliably.
2. Then attach X402 Exact at one well-defined point Pick a moment where payment clearly belongs: unlocking an article, publishing a listing, minting an NFT, leveling a character, rebalancing a portfolio. Implement the 402 flow, EIP-3009 signatures, and relayer settlement, and wire that into one of your tools.
3. Evaluate Deferred and async tasks later If your system does many small queries and has longer-running operations, it’s worth exploring Deferred demos (e.g. around subgraphs) and MCP async tasks — but as a next stage, not the first.

If you’re in the Node.js ecosystem, you don’t have to start from scratch:

- the FlowMCP/x402-core repository provides core building blocks for signature verification, payment objects, and facilitator integration
- FlowMCP/x402-mcp-middleware adds a middleware layer to plug X402 flows into an MCP server built on Node/Express

With those components, MCP gives you structure, MCP Apps give you UI when you need it, and X402 provides the payment and identity foundation. What’s left is product design: which actions should be paid, what information you want from the model, and where on-chain interaction really adds value.

