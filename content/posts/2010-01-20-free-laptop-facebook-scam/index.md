---
title: "\"free laptop\" facebook scam"
author: "halkeye"
description: ""
post_id: "374"
date: "2010/01/20 00:11:52"
date_gmt: "2010/01/20 08:11:52"
comment_status: "open"
post_name: "free-laptop-facebook-scam"
status: "publish"
category: "Internet"
tags: []
cover: "../cover-image.jpg"
post_type: "post"
---

Ah, the things that people believe on the internet. I'd like to believe its not work that is making me paranoid, but it mostly is. Plus I get paid to help try to find the flaws in things before the time is spent developing them.

The interesting about this thing, is when I first saw the title of the facebook group, I was sure that was odd, but I quickly ignored it and moved on. Then I saw it again tonight, and I started to do a bit of digging.

http://www.brain-thee.co.uk/2010/01/how-to-tell-a-scam-on-social-networking-sites/ manages to describe my thought process pretty well actually. But I went a few steps more. I got very weirded out by the fact they wanted me to use javascript to select all my friends for invite (I still can't believe I immediately recognized that javascript the second I saw it.). So after I visited the page they said you could only visit after you invited your friends (look at that, I visited it fine).

Anyways, to make a long story short, I started to dig through the js on the page, found out its essentially a small page with a ad or something to c p a l e a d (dot com, I don't want to link to it). That in itself isn't that interesting, its the fact that it tries to detect firebug so you can disable whatever it does (video maybe? I run with noscript so I don't see it).

I put the code up on pastebin @ http://pastebin.com/d40ea2d1c for anyone who is curious. Its simply the only javascript on the scammers page after I ran it through the reverse dean edwards packer.
