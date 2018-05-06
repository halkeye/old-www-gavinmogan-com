---
title: "How to change from mate-terminal to xfce4-terminal"
link: "https://www.halkeye.net/2012/07/16/change-mateterminal-xfce4terminal/"
author: "halkeye"
description: ""
post_id: "466"
date: "2012/07/16 12:17:55"
date_gmt: "2012/07/16 19:17:55"
comment_status: "open"
post_name: "change-mateterminal-xfce4terminal"
status: "publish"
category: "Linux"
tags: []
cover: "/cover-image.jpg"
post_type: "post"
---

Mostly for my own purposes `mateconftool-2 --set /desktop/mate/applications/terminal/exec --type string "xfce4-terminal"` I'm not a big fan of mate terminal, seems to hurt my eyes, like xfce better, so this still makes the "launch terminal" shortcut work, but launch a different terminal. Probably should switch it to use the debian standard "x-terminal-emulator"