---
title: "Nginx + Cloudflare SSL"
author: "halkeye"
description: ""
post_id: "582"
date: "2015/03/31 10:44:32"
comment_status: "open"
post_name: "nginx-cloudflare-ssl"
status: "publish"
category: "Linux"
tags: []
cover: "../cover-image.jpg"
---

Now that cloudflare will support ssl on every domain you host with them, I wanted to get some of my domains setup to use it.

I didn't really get around to setting up the ssl cert on my side, but since cloudflare supports it, I wanted to redirect people to use it (as a convince, not a security factory) so setup this basic nginx config.

<github-gist id="halkeye/0dea284e6218fa49614b"></github-gist>

It blindly trusts the header, so it's possible to hit these domains without ssl, but I don't want to prevent it, just let those that want it in.

Figured it might be useful for others as well
