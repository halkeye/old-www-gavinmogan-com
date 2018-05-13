---
title: "Systemd + Tshock + Docker"
author: "halkeye"
description: ""
post_id: "1042"
date: "2017/02/12 10:17:09"
date_gmt: "2017/02/12 18:17:09"
comment_status: "open"
post_name: "systemd-tshock-docker"
status: "publish"
category: "General"
tags: ['docker', 'systemd', 'terraria', 'tshock']
cover: "../cover-image.jpg"
post_type: "post"
---

I've been diving pretty head long into running services with docker. I've ported someone's mineos and patched it to run in docker with a custom set of users. I have factorio server running. Even openhab running my meager home automation setup. Its the easiest way to run an application and not worry about system depaendancies.

Most of the time its pretty straight forward. docker run, walk away.

Tshock/Terraria gave me a bunch of trouble. It requires a working stdin, which none of my other daemonized processes do.

A bunch of digging and trial and error, I found out about the tty functionality for services. Which worked perfectly, but once I first logged in, it was causing my server to beep endlessly. I suspect tshock was sending terminal control codes.

Did a bit more reading. Found out you can have input from a tty, but output to the journal as normal. SUCCESS!

So for people like me that want to run tshock this way, here's my systemd service file:

```
[Unit]
Description=terraria
After=docker.service
Requires=docker.service

[Service]
TimeoutStartSec=0
Restart=always
# needed because tshock crashes when no stdin
StandardInput=tty
# Hijack tty11 for this purpose
TTYPath=/dev/tty11
# all output should stay in the journal though
StandardOutput=journal
ExecStartPre=-/usr/bin/docker stop terraria
ExecStartPre=-/usr/bin/docker rm terraria
ExecStop=/usr/bin/docker stop terraria
ExecStart=/usr/bin/docker run --rm -it \
        -p 7777:7777 \
        -v /storage/games/terraria/world:/world \
        --name terraria \
        ryshe/terraria:latest \
        -autocreate 3  \
        -world /world/Lg-Normal-17-02.wld

[Install]
WantedBy=multi-user.target
```
