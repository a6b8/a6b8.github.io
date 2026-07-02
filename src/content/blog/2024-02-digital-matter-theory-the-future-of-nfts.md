---
title: "Digital Matter Theory: The Future of NFTs"
description: "As we step into the digital dawn of 2024, the landscape of Non-Fungible Tokens (NFTs) is undergoing a remarkable evolution, heralding the arrival of the Bitcoin NFT…"
date: 2024-02-22
author: "andr3a5"
tags: [ "bitcoin", "digital-matter-theory", "ordinals-protocol" ]
draft: false
head:
  - tag: link
    attrs:
      rel: canonical
      href: "https://medium.com/@a6b8/digital-matter-theory-the-future-of-nfts-5902933ee01e"
---

*Originally published on [Medium](https://medium.com/@a6b8/digital-matter-theory-the-future-of-nfts-5902933ee01e) on February 22, 2024.*

As we step into the digital dawn of 2024, the landscape of Non-Fungible Tokens (NFTs) is undergoing a remarkable evolution, heralding the arrival of the **Bitcoin NFT Summer**. This transformative period is marked by the innovative application of **Digital Matter Theory (DMT)** and the pioneering efforts in the realm of Bitcoin inscriptions, which are setting the stage for a new era of dynamic NFTs.

## The Meteoric Rise of Bitcoin Inscriptions and the Birth of Dynamic NFTs

![](/blog/03-digital-matter-theory-the-future-of-nfts/img-01.webp)
*First Inscription by Casey Rodarmor*

On December 22, 2022, Casey Rodarmor uploaded the first Inscription on Bitcoin ([Ordinals](https://ordinals.com/inscription/0)). Previously, he had laid the groundwork with the Ordinals theory to separate and count sections of Satoshis (the smallest unit of Bitcoins). This allowed for traceability to be derived, making it possible to store images in an unused code area through a programming error in the Taproot update in 2021 ([Chainalysis](https://www.chainalysis.com/blog/bitcoin-taproot-upgrade/)). Since Taproot is given preferential treatment, storing data there was also four times as cheap as in other areas. Within a few weeks, 1,000, 10,000, and 100,000 Inscriptions were reached. After just over a year, more than 60,000,000 Inscriptions were created. Projects to store Inscriptions have also emerged on other blockchains like DOGE or Ethereum ([Ethscription](https://ethscriptions.com)).

![](/blog/03-digital-matter-theory-the-future-of-nfts/img-02.webp)
*Introducing Metadata at Inscribe Amsterdam 2023*

Since then, the Jubilee Update in January 2024 introduced a metadata standard directly as an optional field ([Ordinals.com](https://ordinals.com/inscription/fa9a67e27219837be1ec616470d7d1de0e822b245c233a5bf9699cd2abc01742i0)). Moreover, the Child/Parent connection now allows dependencies to be represented, which can be queried in the inscription through the newly created endpoints, thus enabling dynamic NFTs. However, all these functionalities can also be implemented on Ethereum in one form or another. Although it would be more expensive in transaction costs, it is possible.

![](/blog/03-digital-matter-theory-the-future-of-nfts/img-03.webp)
*BRC-20 Inscription*

Due to the pressure exerted by the highly hyped BRC-20 standard ([Gitbook](https://domo-2.gitbook.io/brc-20-experiment/)) last year to accurately represent account balances, some projects attempted to introduce an additional layer of validation. The most flexible solution, created by one of the best Ordinals developers, “bennyTheDev” ([Twitter](https://twitter.com/rarity_garden)/[Github](https://github.com/bennyTheDev)), went online in recent months. This also enabled many additional functions.

## The Infinite Journey of Bitcoin Block Inscriptions and the Evolution of Digital Matter Theory

![](/blog/03-digital-matter-theory-the-future-of-nfts/img-04.png)
*Visualisation of Block 831555.bitmap, Source: https://mscribe.io*

At the same time, Bitoshi Blockamoto ([Twitter](https://twitter.com/blockamoto)) developed a standard for claiming Bitcoin blocks for oneself. The idea was to claim a block number for oneself, for example, “1.bitmap”. The simplicity of the idea led to great hype, and just a few weeks later, the “Blockout” ([YouTube](https://www.youtube.com/watch?v=d2GhSwwLMP4)) was announced. This means that an Inscription was created for every Bitcoin block (over 830,000+), but with a new block added every 10 minutes, this project will never be completed.

![](/blog/03-digital-matter-theory-the-future-of-nfts/img-05.png)

This raised the question of what can be done with these blocks. The Blockrunner Podcast, which sees a vast range of applications for .bitmap in the metaverse, particularly pondered this question. The idea is that a block of the Bitcoin network contains much more information ([Blockstream](https://blockstream.info/block/0000000000000000000354d3e500d4c25b92f03b59e4ddccc36ecc571e470eaf)), from which “Parcels” could be derived. This idea was then theorized, leading to the “Digital Matter Theory” short “DMT” ([GitBook](https://digital-matter-theory.gitbook.io/digital-matter-theory/introduction/digital-matter-theory)). The theory posits that blockchain data is random and different parameters can be derived from it. These can then be displayed in games or NFTs as “Traits”. And from this, they derive a Rarity Score, which can be applied like with trading cards, ultimately determining the price.

The question was how this theory could now be applied on-chain in Ordinals with Inscriptions. “BennyTheDev” and the “Block Runners” teamed up to adjust the indexer to search for patterns in blockchain data. Now, it is possible to define standard patterns, and users can claim a block for themselves similar to .bitmap. Whether the block is valid for the project depends on the set pattern. Whether the Inscription is valuable if valid depends on the actual attributes.

![](/blog/03-digital-matter-theory-the-future-of-nfts/img-06.png)
*Nouns.wtf*

After the first NFT hype in 2022, we saw that especially on-chain NFTs like Autoglyphs stabilize in value and continue to fetch high auction prices ([NFT Now](https://nftnow.com/features/exclusive-inside-the-historic-14-5-million-autoglyphs-set-acquisition/)). **Every Inscription on Bitcoin is, by default, on-chain**. Projects with an infinite duration, like [Nouns](https://nouns.wtf), have shown that this can create a vibrant ecosystem that benefits every NFT in the collection. This attribute is now added through DMT. The search for patterns in blocks never ends. Although a pattern is defined at one point, the rarity score changes every 10 minutes as new data is added. Thus, the projects remain dynamic and experience healthy growth.

## NatCats and the Future of Generative NFTs

And here we are in February 2024. Two weeks ago, the first Generative NFT based on DMT and Trac/tap was created and was an immediate success.

On February 8, 2024, **NatCats** registered the element “3b.3b.11.element” as an Inscription, meaning the Bits Element (hex) was set as the field. The numbering is visible on the Gitbook ([Digital Matter Theory](https://digital-matter-theory.gitbook.io/digital-matter-theory/introduction/digital-elements/.element-registry)) and is being expanded by Block Runner. The pattern was set to “3b”, which is also the name.

> **Content**: 3b.3b.11.element  
> **Pattern Format**: <name>.<pattern>.<field>.element  
> **InscriptionID**: af328dc8cb5955c7f9e3db10ce3bd295f8e6974a7c7af456d1beefb702b04c33i0**URL**: [Ordinals.com](https://ordinals.com/inscription/af328dc8cb5955c7f9e3db10ce3bd295f8e6974a7c7af456d1beefb702b04c33i0)

Then, the pattern was linked to the token via “dmt-deploy”. The “tap” protocol was chosen as the project, “dmt-deploy” as the operation, and the previously created Inscription was set as the element. The project was named “natcats”, and the data type was set with the value “h”, indicating “hex”. Up to block 830591, there were 8064 blocks carrying the pattern “3b” and thus are valid. Every 10 minutes, new blocks are added, which can produce more natcats. Therefore, more than 8000+ blocks contain a “natcat”.

> **Content**:  
> {  
>  “p”: “tap”,  
>  “op”: “dmt-deploy”,  
>  “elem”: “af328dc8cb5955c7f9e3db10ce3bd295f8e6974a7c7af456d1beefb702b04c33i0”,  
>  “tick”: “natcats”,  
>  “dt”: “h”  
> }  
> **InscriptionID**: 3e09b19d668e39bfa16aeae7882c123bfc42f939a09426b240b176f98628f487i0**URL**: [Ordinals.com](https://ordinals.com/inscription/3e09b19d668e39bfa16aeae7882c123bfc42f939a09426b240b176f98628f487i0)

Now, collectors can mint “natcats” via a JSON inscription. “p” defines the indexer “tap”. The operation “dmt-mint” and a reference to the “dmt-deploy” JSON is expected via “dep”. The “tick” is again listed as “natcats”. Up to this point, all minted JSON inscriptions contain the same content. “blk” then determines the block one wants to claim, in this case, “**42336**”.

> {  
> “p”:”tap”,  
> “op”:”dmt-mint”,  
> “dep”:”3e09b19d668e39bfa16aeae7882c123bfc42f939a09426b240b176f98628f487i0",  
> “tick”:”natcats”,  
> “blk”:”42336"  
> }**InscriptionID**: 1afacc5ddd3693326f503fab0a820f7fdea63f51029ad875351bbafaf5471d61i0**URL**: [Ordinals.com](https://ordinals.com/inscription/1afacc5ddd3693326f503fab0a820f7fdea63f51029ad875351bbafaf5471d61i0)

To check if the Inscription is valid, one can view the block on a Blockchain Explorer ([Blockchain.com](https://www.blockchain.com/explorer/blocks/btc/42336)). In this case, the bit field decoded is visible: 474,199,013. Converting the number 474199013 into hex via a converter ([RapidTables](https://www.rapidtables.com/convert/number/decimal-to-hex.html)) yields the result: 1C4**3B**3E5. The sought-after pattern “3b” is thus contained. Therefore, this block contains a “Natcat”. This Inscription is also called UNAT (Unique Non Arbitrary Token).

As of now, at the time of writing this post, there is still no support for ‘dmt-mint’ operations on the Tap protocol online. Therefore, the community has created an evaluation on [Geniidata](https://geniidata.com/user/BitGnat/dmt-natcats) to track blocks and inscriptions.

![](/blog/03-digital-matter-theory-the-future-of-nfts/img-07.png)
*Source: https://geniidata.com/user/BitGnat/dmt-natcats*

Now, based on the block number, Traits can be derived. For example, the content 420 in the block number sets the Catnip Trait, which so far only occurs in 38 NFTs (0.5%). The complete list can be found here: [NatCats GitBook](https://ev0-2.gitbook.io/natcats/).

![](/blog/03-digital-matter-theory-the-future-of-nfts/img-08.png)
*Source: https://ev0-2.gitbook.io/natcats/*

As search patterns the following are used:  
- “**contains”**: A specific sequence of numbers is contained in the block number.  
- “**digit i=x”**: ‘i’ is replaced with a number indicating the position in the block. ‘x’ specifies the expected single-digit number. For example, ‘digit 3=0’ would be TRUE if the block number is 123056, as counting starts from zero.  
- “**is multiple of x”**: ‘x’ is replaced with a number. If the block is divisible by ‘x’ without remainder, the requirement is fulfilled, thus true.  
- “**contains x-digit Fibonacci number”**: ‘x’ specifies the number of digits that the Fibonacci sequence should contain.

![](/blog/03-digital-matter-theory-the-future-of-nfts/img-09.png)
*Source: https://ordinals.com/inscription/06d04edf52fee74a7e9cc2d9906ade1d514c4d34c2ea9da098c4d9d2e033f140i0*

All search patterns then result in the trait list, based on which the generative NFT can be created. NatCats later also published the code of the actual cats as an inscription. Therefore, there is no direct connection from the ‘dmt-deploy’ operation to the actual visualization.

![](/blog/03-digital-matter-theory-the-future-of-nfts/img-10.png)
*Source: https://twitter.com/decoder_btc/status/1761504437896442093*

It’s likely that in the ‘dmt-deploy’ operation, a key/value field will be added. One possibility would be to name the visualization as an ‘id’, as suggested by [@decoder_btc](http://twitter.com/decoder_btc).

![](/blog/03-digital-matter-theory-the-future-of-nfts/img-11.jpg)

Source: [x.com/bitoordileone](https://twitter.com/bitoordileone/status/1759972679732371750)

![](/blog/03-digital-matter-theory-the-future-of-nfts/img-12.png)

Source: [https://natcats.xyz/](https://natcats.xyz/)

At the time of this article, there are no marketplaces that fully support NatCats. Therefore, various NatCats are currently being sold via spreadsheets.

![](/blog/03-digital-matter-theory-the-future-of-nfts/img-13.png)

![](/blog/03-digital-matter-theory-the-future-of-nfts/img-14.png)
*Source: https://twitter.com/Hallalluja/status/1760342544792084714*

Bitcoin NFT Summer 2024 starts now!

Follow me on [x.com/_a6b8](https://x.com/_a6b8)

