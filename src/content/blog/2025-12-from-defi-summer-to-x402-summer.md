---
title: "From DeFi Summer to x402 Summer: MCP, X402, and the Fragmented Web"
description: "Looking at AI and crypto in December 2025, it feels like someone hit time-lapse x10."
date: 2025-12-03
author: "andr3a5"
tags: [ "chatgpt-apps-sdk", "x402", "fragmented-web", "mcp-ui", "mcp-server" ]
draft: false
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://medium.com/@a6b8/from-defi-summer-to-x402-summer-mcp-x402-and-the-fragmented-web-94faa1c5ffb7"
---

*Originally published on [Medium](https://medium.com/@a6b8/from-defi-summer-to-x402-summer-mcp-x402-and-the-fragmented-web-94faa1c5ffb7) on December 3, 2025.*

![](/blog/02-from-defi-summer-to-x402-summer/img-01.webp)

## A year that feels like ten

Looking at AI and crypto in December 2025, it feels like someone hit **time-lapse x10**.

About a year ago, Anthropic introduced the [**Model Context Protocol (MCP)**](https://modelcontextprotocol.io) — an open standard that lets models talk cleanly to tools, data sources, and apps. Since then, the ecosystem has moved at absurd speed. Big players like **OpenAI, Anthropic, Google, Microsoft** have adopted MCP and woven it into their agent stacks. The first generation of models that don’t just “kind of support” MCP, but have actually **learned it during training**, is now going into production. The next waves in 2026 will speak MCP even more naturally because it’s part of their training pipelines.

![](/blog/02-from-defi-summer-to-x402-summer/img-02.webp)
*2025–03–26, OpenAI CEO Sam Altman: https://x.com/sama/status/1904957253456941061*

![](/blog/02-from-defi-summer-to-x402-summer/img-03.png)
*2025–04–09, Demis Hassabis CEO Google DeepMind: https://x.com/demishassabis/status/1910107859041271977*

At the same time, another puzzle piece appeared: [Coinbase published](https://www.coinbase.com/en-it/blog/coinbase-and-cloudflare-will-launch-x402-foundation) the **X402 whitepaper “**[**Payment Protocol for Agentic Commerce**](https://x402.gitbook.io/x402)**”** and officially launched the spec. X402 finally gives the long-unused HTTP status code **402 “Payment Required”** a clear, machine-readable meaning — including amounts, recipients, networks, and accepted tokens.

![](/blog/02-from-defi-summer-to-x402-summer/img-04.png)
*2025–11–22, SEP-1865: MCP Apps — Interactive User Interfaces for MCP: https://github.com/modelcontextprotocol/modelcontextprotocol/pull/1865*

Recently, a third building block landed. In the **MCP-UI Working Group** — an open community around the MCP maintainers (led by Anthropic) — the **MCP Apps Extension** was created and submitted as a pull request to the MCP repo. OpenAI joined this working group and contributes there instead of building a proprietary UI one-off. So MCP now has not just a language for **context**, but also a language for **user interfaces**.

Important context: right now, it’s **December 2025**. When this text talks about a possible **“402 Summer,”** it’s not about tomorrow — it’s about a phase that might start in **summer 2026**. This is intentionally a **speculation about the near future**: what could the next big narrative be when these building blocks come together?

In just twelve months, we’ve gotten a shared **context standard** (MCP), an **AI-native payment protocol** (X402), and a fresh proposal for **standardized UIs** (MCP Apps).

This piece is not a history lesson. At its core, it’s about one simple question:

> *What happens when AI agents don’t just talk to the world — but also ****autonomously pay small amounts in stablecoins**** to unlock things?*

## Why crypto is searching for a new narrative

If you look back at the last few years, two phases stand out:

- DeFi Summer 2020 — financial primitives without banks, open and permissionless.
- NFT Summer 2021 — new forms of digital ownership, from PFPs to art projects.

Both were more than just price speculation. They came with this “click” in people’s heads: **“Oh, so that’s another way this could work.”**

By the end of 2025, the mood is different. The **meme coin market** feels exhausted; lots of people paid their tuition, and the joke is played out. With Trump’s 2024 win and new stablecoin laws, regulation is clearer, but that clarity doesn’t feel particularly inspiring. [**Prediction markets**](https://polymarket.com) like Polymarket show how robust the infrastructure is — but they don’t, on their own, carry a broad new narrative.

The tech exists. The rails work. What’s missing is a big, positive story about *why* this is exciting.

Maybe this time the story doesn’t come from a new token or a new chain, but from a **different kind of interface**:

> *It’s no longer you clicking “Confirm” in a wallet. It’s your ****AI agents**** acting, negotiating, and paying in the background — based on rules you set once.*

On the back of a napkin, the last years look like this:

- 2020 — DeFi reshapes capital.
- 2021 — NFTs reshape digital ownership.
- 2024/25 — MCP and X402 reshape agent interaction and payment.

That’s where MCP, X402, and a new kind of infrastructure meet: **proxy clients** that let agents pay without forcing the big LLM platforms to give up their own billing stacks.

## MCP in a nutshell: Context and now UIs

The name **Model Context Protocol** sounds dry, but you can almost read it backwards:

- it’s a protocol
- that describes the context
- a model needs in order to act sensibly.

Instead of proprietary “plugins,” MCP defines a small set of primitives:

- Tools — functions an agent can call, like mint_nft, get_article, search_images.
- Resources — data sources or files it’s allowed to access.
- Prompts — reusable templates and workflows.

An MCP client begins by asking which tools, resources, and prompts a server offers. The server answers with a standardized JSON schema. On that basis, interesting things become possible:

Anthropic is implementing large parts of the spec in its own clients — tools, resources, prompts, logging, sampling. OpenAI and Google also integrated MCP, but in practice they lean mainly on the **core tooling**: listing tools, calling tools, and passing simple context. Many of MCP’s “luxury features” are still being rolled out.

The result is a **minimal common denominator** shared by the industry: roughly “JSON Schema + tools + list tools.” For what follows, that is enough. We mainly need **tools** that are cleanly described and callable by agents.

## MCP Apps and the “Fragmented Web”

![](/blog/02-from-defi-summer-to-x402-summer/img-05.png)
*2025–10–02, [Session] MCP-UI: Next-gen Agentic Experiences: https://www.youtube.com/watch?v=SIXTArBVL5w*

About four months ago, the MCP community started asking a more concrete question:

> *“How do we actually bring UIs into this protocol?”*

[That led to **MCP-UI**, an approach that lets an MCP server offer small user interfaces (“views”)](https://mcpui.dev/guide/introduction). Shopify was one of the first to show how real mini-UIs can be embedded into chat.

![](/blog/02-from-defi-summer-to-x402-summer/img-06.png)
*2025–08–05, MCP UI: Breaking the text wall with interactive components: https://shopify.engineering/mcp-ui-breaking-the-text-wall*

It quickly became clear that not every MCP server needs a UI. The UI layer shouldn’t sit in MCP’s hard core, but in an **extension**. This is where **MCP Apps** comes in:

- MCP Apps is the first prominent extension in MCP v2.
- It merges ideas from MCP-UI with requirements from, for example, OpenAI’s apps.
- Many OpenAI apps already speak MCP under the hood — but their UI is still SDK-specific. MCP Apps aims to standardize that part.

In practice, an MCP server can now declare **UI fragments** alongside tools: small dashboards, buttons, forms, tables, charts. MCP-capable clients (ChatGPT, Claude, VS Code, browser chat, …) can render these fragments directly in the conversation and connect them to tool calls.

The MCP-UI community likes to call this the **“Fragmented Web”**:

> *Instead of full websites with logins and dashboards, ****small web fragments**** — buttons, tables, charts — appear right inside your chat.*

On top of that, a new layer of [**agentic commerce**](https://www.vellum.ai/blog/mcp-ui-and-the-future-of-agentic-commerce) emerges. In the broad sense, agents look up products, show UI fragments, and you pay at the end via classic rails such as credit cards or wallets. In the narrower, more exciting sense, agents use protocols like X402 to execute **micropayments directly** — at cent or sub-cent scale, programmatically and without a human click marathon.

That narrower version — agentic commerce built on MCP + MCP Apps + X402 — is the focus here.

## X402: When “402 Payment Required” suddenly matters

HTTP has had the status code [**402 “Payment Required”**](https://blog.cloudflare.com/x402/) for decades. Almost nobody used it.

![](/blog/02-from-defi-summer-to-x402-summer/img-07.png)
*2025–09–23, Cloudflare: Launching the x402 Foundation with Coinbase, https://blog.cloudflare.com/x402/*

**X402** changes that. The protocol defines how a server can say:

> *“This request costs 0.01 USDC. Here is how to pay.”*

[Very simplified, the flow looks like this](https://github.com/coinbase/x402):

1. A client calls an API — for example an MCP tool get_article.
2. The server responds with status 402 and includes a payment body with an amount (for example 0.03 USDC), a network (such as Base or Avalanche), a recipient, and a payment scheme (Exact or Deferred).
3. An X402-capable client or proxy chooses an option, signs a payment or a payment promise, adds the payment proof in an X-PAYMENT header, and repeats the original request.
4. The server checks whether the payment has been made or committed and then returns the content.

X402 is **machine-friendly**, **chain-agnostic**, and perfect for agents handling micropayments quietly in the background.

![](/blog/02-from-defi-summer-to-x402-summer/img-08.png)
*x402scan: https://www.x402scan.com*

## Exact vs. Deferred: Two payment modes

A key part of X402 is the concept of **payment schemes** — the *how* of payment.

**Exact** is the scheme that exists today. You pay a specific amount immediately for exactly one request. An NFT mint, a single article, one game action — each gets a small, explicit price, and the client signs authorization for that amount. On EVM chains, this is based on a small extension to the **ERC-20 standard**: the function `transferWithAuthorization(...)` (EIP-3009), sometimes also described as “transfer without prior approval.” Tokens like [**USDC**](https://www.circle.com/en/usdc) already include this function, which makes them “X402-ready” with minimal extra effort.

![](/blog/02-from-defi-summer-to-x402-summer/img-09.png)
*ERC-3009 Transfer with Authorization: https://eips.ethereum.org/EIPS/eip-3009*

**Deferred** is emerging, and it fits many LLM use cases even better. Here the server doesn’t charge each request on-chain. Instead, it says: “We’ll bill your usage at a certain rate (for example, 0.03 USDC per article or per 1,000 tokens) and settle later.” The client cryptographically signs the HTTP requests themselves and effectively commits to paying for that usage. The server verifies the signatures and returns the content immediately, without going on-chain. Later — for example once a day — all open items are aggregated into a single settlement.

![](/blog/02-from-defi-summer-to-x402-summer/img-10.png)
*2025–09–25, feat: add deferred payment scheme spec: https://github.com/coinbase/x402/pull/426*

![](/blog/02-from-defi-summer-to-x402-summer/img-11.png)
*Deferred Payments for Agents: A Novel Enhancement to x402 with Rodrigo Coelho, CEO of Edge & Node: https://www.youtube.com/watch?v=TXVVanhDQxI*

The shorthand is:

- Exact: ideal for one-off actions with a clear unit (mint, move, game action).
- Deferred: ideal for batches or streams of calls where you want to bill in one go.

## How small can micropayments realistically get?

In theory, USDC can be billed down to **six decimal places**. The more practical question is:

> *“What price range still makes sense once effective transaction costs are considered?”*

[On **Base**](https://docs.cdp.coinbase.com/x402/network-support), an L2 where X402 is mainly rolled out today, the bare on-chain costs for a settlement are typically a fraction of a cent. On the [**Avalanche C-Chain**](https://www.avax.network), gas costs per transaction tend to land in the low single-digit cents.

In the X402 model, the **server or facilitator pays gas**, not the end user. It’s similar to PayPal or credit cards, where the merchant bakes fees into pricing. The user just sees: “This action costs 0.01 USDC.”

That implies that on Base, X402 payments can realistically live in the **0.001–0.01 USDC** range — fractions of a cent to a few cents, especially if settlements are batched. On Avalanche, it’s more realistic to think in “a few cents per settlement” or to tally many micropayments off-chain and periodically settle net on-chain.

## Cost comparison: PayPal vs. X402

To get a feel for the economics, compare it to classic providers such as PayPal.

In e-commerce, PayPal and similar services typically charge a percentage fee plus a fixed cent component. On micropayment plans, 5% plus a fixed fee is not unusual. At $1 of volume, that’s fine. At $1,000, 5% is $50, and even 3% adds up quickly.

**X402 flips that logic.**

On-chain costs are essentially **fixed per settlement**, plus whatever the facilitator charges. Whether you settle $1 or $1,000 barely changes the gas costs. Fees depend mostly on the **number of settlements**, not on the **amount** flowing through.

Of course, this comparison is not entirely fair. Traditional providers bundle payment rails with **buyer protection, chargebacks, fraud checks, and dispute resolution**. X402 sits a layer lower. It defines how a payment is authorized and settled, but not how disputes are resolved or how trust between buyer and seller is organized.

That gap is a business opportunity: you can build services on top of X402 that provide something like PayPal-style protection — but specifically optimized for agents, APIs, and micropayments.

On the blockchain side, you get different benefits. Instead of a “secret number on a piece of plastic” (card number + CVV) that can be abused once leaked, you work with **public-key cryptography** and signed payments that can be executed thousands of times a day without constantly pushing card details across the network.

So it’s not “better” or “worse” in general — it’s simply a different place in the stack. **Traditional payment providers sell security + convenience as a bundled product.** **X402 provides technical rails for new security and trust models for agents.**

## A bit of pricing math

If you’re a creator or game developer thinking about pricing, a tiny bit of math already helps.

Assume your effective cost per settlement (gas + infra + some buffer) is **1 cent**.

- At 1 cent price, you are at break-even.
- As a simple “×2 rule of thumb,” you might say: 1 cent cost → 2 cents price → 1 cent remains with you, or a 50% margin.
- If you want a 25% profit margin, you can use the formula: price = cost / (1 − margin). With 1 cent cost and a 25% target margin, the price is roughly $0.0133 — in practice you round to $0.02.

For a small NFT game, you can think like this: estimate your effective cost per action (for example 0.003 USDC on Base), double it as a starting price, and adjust if you need more margin.

The deeper shift is psychological: **transaction costs now look like fractions of a cent, not 3–5% of volume.** That’s what makes “programmable micropayments” viable — and with them, the agentic side of agentic commerce.

## Why payment standards probably won’t come from the big LLMs

For **context**, everyone wants a shared standard, because agents should understand as many tools as possible. That made MCP feasible.

For **payments**, the incentives are different. Google has its own developer and cloud billing systems. OpenAI makes money via usage-based billing on its own account and credit stack. Anthropic is similar. None of them has a strong reason to contort their billing around an external protocol like X402.

Realistically:

- MCP becomes the standard for how tools describe themselves and are called.
- **X402** (with Exact and Deferred) becomes the standard for *how independent services get paid per call*.
- The big LLM providers will probably not wire X402 directly into their own products anytime soon.

That’s not a bug. It is exactly the gap that new infrastructure can fill.

From the perspective of a user or indie developer, this also reveals a missing middle in MCP’s authentication landscape. Today, most MCP servers are either fully open, rely on simple API keys or static Bearer tokens, or sit behind full OAuth 2.1 stacks where login, roles, and billing are bundled into a heavy Web2-style infrastructure. In practice, you end up with three broad classes: completely free MCP servers, semi-open MCP servers where some routes stay free but expensive or compute-heavy tools are gated by small X402 payments, and fully authenticated MCP servers that require identity up front and usually hide payment inside the login and billing system. X402 naturally fills that middle tier: the server stays reachable to anyone, but it can treat a stablecoin address as a lightweight, pseudonymous identifier, enforce quotas and rate limits per address, and charge per call without forcing small projects to run their own OAuth, subscription logic, and PayPal-style backend.

## The missing middle: proxy clients as wallet layer for agents

This is where the project I’m working on comes in.

![](/blog/02-from-defi-summer-to-x402-summer/img-12.png)
*FlowMCP: https://github.com/FlowMCP*

> *Each user has their own *[***MCP proxy client***](https://github.com/FlowMCP/x402-mcp-middleware)* that understands X402, manages prepaid balances, and acts as a “payment wallet” for their AI agents.*

The user configures **one** MCP server in their AI client — the proxy. This proxy speaks MCP toward the LLM and MCP + X402 toward target servers such as games, media, and data services. It manages the user’s **prepaid balance** (for example in USDC) and enforces rules like daily limits, per-tool caps, and blacklists.

When a tool demands payment with a 402, the proxy can:

- pay automatically if there is a matching rule,
- ask for confirmation via a small UI in chat,
- or block the call entirely.

Technically, the proxy consists of:

- an MCP server interface toward the LLM,
- an MCP client layer toward target servers,
- an X402 payment engine,
- a policy engine with user-specific rules,
- and a wallet or balance manager for prepaid funds.

![](/blog/02-from-defi-summer-to-x402-summer/img-13.png)
*2025–06, AgentPays — M2M Payments Built into MCP: https://github.com/FlowMCP/AgentPays*

A few months ago, I built an early proof of concept called [**AgentPays**](https://github.com/FlowMCP/AgentPays): a proxy that automatically executes X402 payments for a single user whenever an MCP tool returns 402. The current proxy is the generalized version — multi-tenant, scalable, and designed so that **many small projects** can plug into it.

## Sybil resistance: paywalls as spam filters for agents

Another easy-to-miss advantage of X402 is **Sybil and bot protection**.

Without payment, anyone can spam a public API or MCP server with arbitrary requests. DDoS protection is purely technical: rate limits, captchas, IP blocks. In a world full of AI agents, that gets even harder — everything is a machine.

With X402, you can put **compute-heavy tools behind a small paywall**. If a complex analytics call costs 0.005 USDC, then 10,000 fake calls suddenly have a real price tag. Each X402 payment is tied to a **stablecoin address** with a signature. Attackers need real keys with real funds, and abusive addresses can be blocked. Sybil attacks become significantly more expensive.

Even in the early AgentPays prototype, this was a central motivation: add paywalls to compute-intensive MCP tools so that bots cannot hammer them for free. X402 turns “anyone can spam forever” into “anyone can spam — as long as they’re willing to pay.”

## Example 1: A chat Tamagotchi as a dynamic NFT

To make this more concrete, imagine a small NFT pet on Avalanche — a lava fox, a water dragon, whatever you like. Everything happens in chat with an AI.

You start by saying you want to mint a lava fox. The AI explains the cost (say, 0.1 USDC), gets your confirmation, and calls an MCP tool like `create_pet_nft`. The game server answers with 402. The proxy checks your rules, pays via X402 (Exact scheme), retries the call, and the NFT is minted on-chain.

From then on, you can talk to your pet. You feed it, train it, evolve it. Each action is an MCP tool call such as `feed_pet`, `train_pet`, or `evolve_pet` with a tiny fee, paid in the background via X402 by the proxy.

On-chain, the contract tracks level, mood, and traits. The NFT becomes **dynamic** — its state is the sum of your paid actions. You can define a daily rhythm, for example allowing the pet to be fed only once per day. The MCP server and chain keep track of that. In your normal chat workflow, you might occasionally say:

> *“Check on my pet. If it’s hungry, feed it for today.”*

The agent checks the state, sees that today’s feeding is still open, renders a tiny MCP App: a “Feed (0.003 USDC)” button, and handles everything else.

The pattern is new:

- your “game” runs as an MCP server in the background,
- the AI is your universal home screen,
- and you switch between work, code, research — and this small pet you poke in spare minutes, like Snake on an old Nokia.

Behind the cute skin is a serious pattern: **small, recurring bits of value** that can be billed at micro-scale. The same structure works for energy-saving agents checking tariffs once a day, learning agents pulling one task per day from a premium course, or monitoring agents that pay tiny amounts to keep data feeds fresh.

## Example 2: Magazines and archives become “liquid” again

Now imagine a magazine or photo archive that goes back to the 80s. Ad revenue is thin, paywalls barely work, and the editorial team is sitting on a treasure of material that few people ever see.

An AI is writing a report and needs original sources from 1983 — perhaps ten different articles plus images from multiple magazines.

The archive runs an MCP server with tools like `search_article` for full-text search (free), `get_article` that returns full text for a small fee, and `get_image_licensed` that returns images with clear licenses at a higher price.

This is where the **Deferred** scheme shines. The AI uses `search_article` to find relevant pieces. For each candidate, it calls `get_article`. The server responds with 402 and an offer to be paid via Deferred rate – for example 0.03 USDC per article. The proxy signs the requests and thereby accepts that rate. The archive returns articles immediately, without going on-chain each time. At the end of the day, all calls are tallied and settled in one transaction.

For the archive, this feels like **streaming royalties**. Each access only brings a few cents, but agents around the world make many small requests, all day, every day. Over time, this becomes a long-tail revenue stream — the informational equivalent of listening to an old track on Spotify.

Compared to dusty PDF archives behind clunky logins and subscription logic, this is a different world. With MCP + X402, magazines can say:

> *“Here’s our API. Any agent can tap into it for micro-pennies — with clean accounting, automated, worldwide.”*

LLMs are perfect consumers of this model. They excel at **combining many data sources**, and X402 gives them a way to turn that access into real revenue for the sources.

## Why this is especially exciting for small builders

The parallel to **NFT Summer** is obvious.

Back then, [**ERC-721**](https://eips.ethereum.org/EIPS/eip-721) created a shared standard for NFTs. Suddenly thousands of small teams launched art, games, and experiments. Marketplaces, wallets, and tools only had to support one standard to unlock an entire universe of projects.

Something similar is starting now:

- MCP standardizes how a tool describes itself and how an agent calls it.
- MCP Apps let you reuse UI elements instead of building full apps.
- X402 standardizes how a service can be paid per request — with Exact for immediate payments and Deferred for bundled billing.
- A proxy client in the middle makes sure today’s LLMs can reach those paid tools without OpenAI and friends having to rewire their billing.

For small teams, artists, and indie studios, this means you can:

- publish a game, archive, or data service as an MCP server,
- price individual tools using Exact or Deferred,
- plug into proxy infrastructure so agents can navigate your paywalls,
- ship small UI fragments via MCP Apps instead of building a full web product.

Just like ERC-721 enabled a network of small NFT projects, MCP + X402 + proxies can enable a network of **agent services**: game mechanics, knowledge bases, tools — all reachable through the **same chat interface** users already live in.

## Risks and open questions

The upside is big, but several issues deserve a clear warning label.

**Security and abuse.** Agents can be prompted into doing dumb things — including spending money in ways users didn’t intend. We will need budget limits, per-tool and per-server rules, logging, and confirmation flows through MCP App UIs in chat.

**Regulation and custody.** Once a proxy holds prepaid balances, questions arise: when does this become regulated custody? Which KYC/AML rules apply where? These are solvable, but they must be considered in the architecture from day one.

**Centralization pressure.** There is a real risk that a few big providers end up dominating the proxy layer. Countermeasures include open standards (MCP, X402), lightweight self-hostable proxies, and transparent rules and logs — so we don’t just build a new “agent bank,” but a genuine ecosystem.

## Outlook: What a “402 Summer” could look like

If you put all the pieces together, the picture doesn’t feel utopian — it feels near-term.

You talk to an AI and ask it to build you a small game with a fire pet. The AI mints an NFT on Avalanche, manages your pet, shows you a small MCP App with status indicators, and explains what actions cost.

You’re doing research and ask for articles from 1983 on a niche topic. The AI taps into archives, pays a few cents per article (often via Deferred), and makes that visible to you.

You need a dataset, a licensed image, or a specialized analysis job — and in the background, micro-amounts flow via X402, orchestrated by a proxy you configured once.

Maybe, looking back, we’ll call the phase we’re entering **“402 Summer”** — meaning very concretely the summer of **2026**, when MCP-native models are more mature, X402 infrastructure is stable, and the first waves of agentic apps in the Fragmented Web start to show up in everyday life.

Maybe some other term wins. The label is secondary. What matters is:

- It’s not about the next casino token.
- It’s about agents starting to pay for value — precisely, API-first, in tiny amounts.
- And it’s about small teams being able to tap into those value streams without building their own wallet UIs, subscription backends, and billing systems.

I’m currently building one of these proxy clients because I’m convinced this layer is missing: a plug-and-play MCP server that understands X402, enforces budgets, and opens doors for games, media, data, and lots of small experiments.

Whether we’ll remember summer 2026 as “402 Summer,” nobody knows. But the combination of MCP, MCP Apps, X402 (Exact + Deferred), the Fragmented Web, and proxy infrastructure feels like the most exciting raw material the crypto and AI world has seen in a long time — precisely **because** it’s not a finished product from the big platforms, but leaves room for new, unexpected projects.

And that’s exactly where things get interesting.

