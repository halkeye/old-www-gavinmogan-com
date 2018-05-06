---
title: "Nginx + Cloudflare SSL"
link: "https://www.halkeye.net/2015/03/31/nginx-cloudflare-ssl/"
author: "halkeye"
description: ""
post_id: "582"
date: "2015/03/31 10:44:32"
date_gmt: "2015/03/31 17:44:32"
comment_status: "open"
post_name: "nginx-cloudflare-ssl"
status: "publish"
category: "Linux"
tags: []
post_type: "post"
---

Now that cloudflare will support ssl on every domain you host with them, I wanted to get some of my domains setup to use it. I didn't really get around to setting up the ssl cert on my side, but since cloudflare supports it, I wanted to redirect people to use it (as a convince, not a security factory) so setup this basic nginx config. [gist id=0dea284e6218fa49614b] It blindly trusts the header, so it is possible to hit these domains without ssl, but I don't want to prevent it, just let those that want it in. Figured it might be useful for others as well