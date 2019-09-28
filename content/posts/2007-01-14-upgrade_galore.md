---
title: "Upgrade Galore"
author: "halkeye"
post_id: "307"
date: "2007/01/14 13:17:55"
post_name: "upgrade_galore"
status: "publish"
category: "Web"
tags: []
cover: "/assets/cover-image.jpg"
---

Yay! Spent the day on the server.

* Upgraded Apache (I think, I didn't check version #s)
* Dropped lighttpd frontend (don't need 2 httpds running at one time)
* Upgraded loudblog for hiscifi.com (Even if I never do get a response as to if they are ditching loudblog/whatever)
* Upgraded php
* Installed eaccelerator

I'm fairly certain I tracked down the perforamce issue too.. Streaming music to a flash player. I don't know for certain, but when I attempted to do it, like 15 apache threads opened up, and load spiked.. and that was just me.

Now to go back to playing dungeon keeper 2.. man old games.. how I miss thee :P