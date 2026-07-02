---
title: "Roadmap for EasyMina in 2024"
description: "In January 2024, version 1.0 of EasyMina was released. In this post, I will briefly summarize the challenges and then set out the planned challenges for this year."
date: 2024-02-05
author: "andr3a5"
tags: [ "mina-protocol", "zkapps", "o1js" ]
draft: false
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://medium.com/@a6b8/roadmap-for-easymina-in-2024-027acbf9961b"
---

*Originally published on [Medium](https://medium.com/@a6b8/roadmap-for-easymina-in-2024-027acbf9961b) on February 5, 2024.*

![](/blog/04-roadmap-for-easymina-in-2024/img-01.webp)

In January 2024, version 1.0 of EasyMina was released. In this post, I will briefly summarize the challenges and then set out the planned challenges for this year.

## Philosophy

EasyMina is designed as an educational tool and aims to practically demonstrate to developers the importance of security and the various steps of private contracts on the Mina blockchain. The main focus is on interacting with public test networks, capturing issues that may not arise or be irrelevant in local testing. The focus on the most challenging type of interaction with a test network was crucial to significantly expand functionality and structure.

## Development Phases

It started as a script for a Mina project in 2022, then evolved into a standalone module in mid-2023, with the functionality to upload smart contracts more quickly. Over the last 6 months, the code has been refactored and significantly expanded after a more thorough analysis of the requirements.

The last development phase addressed these 3 pain points:

1. **Structured and secure storage of private keys:** In many test frameworks, secrets are stored in unencrypted .env files. While this may be acceptable for changeable passwords, the question arises whether it applies to private keys for blockchain accounts. Therefore, all private keys of accounts and contracts are encrypted by default, and the decryption password can be placed outside the repository.

2. **Transparent representation of the current status of transactions or accounts: **To get started, an empty account needs to be filled with test tokens. Then, a contract can be uploaded, and only after that can interactions with various methods occur. Each of these interactions comes with a waiting period until the transaction is recognized by the blockchain. For new (or experienced) developers, it can be difficult to determine the current status of transactions due to the decentralized nature. Hence, there are built-in aids at many points to check the status. There is also an overview of all accounts and contracts through the server.

3. **Parallel work on various smart contracts:** For hackathons, learning exercises, or simple experimentation, there are significant advantages to being able to insert multiple projects into one. Parallel use of keys is possible. An import/export tool is available to exchange public or private projects with other developers. EasyMina can offer additional features to developers through a structured arrangement of subfolders, such as documentation and shortcuts.

In addition, work has been done on the UX, and an initial user interface through CLI has been developed to guide developers through project setup. An initial server version provides a range of APIs for quick testing and helps determine the current status of individual projects.

## Planned Steps for 2024

The goal for this year is to better connect the individual areas of Key Management and Rapid Prototyping to create a working environment that benefits developers.

- **Consolidation of the API interface: **To ensure a clear structure that persists beyond the initial alpha stage, consolidation needs to be carried out so that there is no need for non-backward compatible updates shortly after.

- **Work on a public website with an overview of importable projects: **Due to the import and export function, templates can be exchanged. A public platform could create an easily accessible point to receive ideas and suggestions and try out the sketches with just a few clicks.

- **Creating educational content:** A selection of sketches that explain techniques or special features of zk and Mina as minimally as possible should be structured and made available, possibly through the public website. Templates can be downloaded via the CLI by default.

- **Collaboration with other Mina projects:** In principle, any public project that has uploaded a smart contract on a test network can explain access using a script through public (or semi-public) methods. It can encourage developers to try out the application and provide feedback.

- **Developing a flagship example: **A comprehensive example could demonstrate the strength of EasyMina as a whole. An example could be offering the Mina Metaverse Game as a project: [https://github.com/a6b8/mina-metaverse-game](https://github.com/a6b8/mina-metaverse-game). It can be rewritten to clearly explain the smart contract and interaction with the server and wallet.

## Strategy

Ideally, I would like to do all steps simultaneously or start with the most enjoyable part, the Metaverse Game. However, strategically, I believe it makes sense to become visible as quickly as possible. Developers can become more familiar with EasyMina, leading to potential collaborations. Structured educational content could be carried out in cooperation. However, the API consolidation must be completed first to establish a good foundation.

## Conclusion

Overall, I am looking forward to the project positively. Mina still has a manageable number of developers, so expectations must be adjusted somewhat, and caution should be exercised when comparing it with the EVM network. In theory, extension to Ethereum or Bitcoin in this abstract form is possible and could be considered in the future, strategically, to promote extension to Bitcoin, attracting new developers to Mina through this indirect route.

**Quickstart**:

```
npm i -g easyminaeasymina
```

**Docs**: [https://easymina.github.io](https://easymina.github.io/)

**Github**: [https://github.com/easymina/easymina](https://github.com/easymina/easymina)

