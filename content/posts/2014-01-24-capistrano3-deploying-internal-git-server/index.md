---
title: "Capistrano3 - Deploying with internal git server"
link: "https://www.halkeye.net/2014/01/24/capistrano3-deploying-internal-git-server/"
author: "halkeye"
description: ""
post_id: "516"
date: "2014/01/24 16:09:33"
date_gmt: "2014/01/25 00:09:33"
comment_status: "open"
post_name: "capistrano3-deploying-internal-git-server"
status: "publish"
category: "Internet"
tags: ['amazon', 'capistrano', 'programming', 'ruby']
cover: "../cover-image.jpg"
post_type: "post"
---

**Edit:** I updated my "hack" to work with newer versions of capistrano/sshkit - <http://www.halkeye.net/2014/06/06/update-capistrano-hack/>

To set the scene. New team has been using capistrano to deploy some of its apps (all internal/behind our firewall). So new POC project comes along. Nothing sensitive but needs to be publicly accessible. I get very excited because this is the first time I've setup capistrano from scratch. I follow the getting started guide. Deploy to internal test. No problem there. Go to deploy to the amazon box (Go Free Tier) and fail... Riiight, can't talk to our git server.

So spend a while scouring the internet for how to solve this problem. Can I just SCP? Its not that important right now. Hrm. That doesn't seem to work reliably. Lots of solutions, none of which seem very clear and/or work with cap3. So I give up searching. This should be easy right? Just setup a remote tunnel. I open a new window, create  tunnel, edit my config, and bang. Deployed. Yay!

But wait, this is going to get annoying fast. Plus others will have to do that manual process as well. How do I automate this? Scour the internet for a while. Again, no real automation and/or doesn't work with cap3.

Well fine, I always need the excuse to learn more about ruby, so start digging into the code. Its using pre-existing open source modules so it shouldn't be that hard. After a bunch of learning, and giving up, I decided to skip on the nice clean solution and just start overriding some things.

So here it is, config/deploy/production in all its glory:

[gist]https://gist.github.com/halkeye/8609506[/gist]

## Comments

**[Eric Francis](#5724 "2014-01-28 13:16:00"):** This was my exact issue. I take it capistrano does not have a built in way to specify a remote port forward? Or to use the options defined in an~/.ssh/config file?

**[Gavin](#5725 "2014-01-28 13:19:00"):** From what I can see, it does read .ssh/config, but net::ssh doesn't support RemoteForward inside of config (from what I could tell - https://github.com/net-ssh/net-ssh/blob/master/lib/net/ssh/config.rb#L120)


I didn't really want it inside of .ssh/config myself (as each dev would have to make sure that change is in place).


I'll be eventually trying to clean things up and submit a patch.

