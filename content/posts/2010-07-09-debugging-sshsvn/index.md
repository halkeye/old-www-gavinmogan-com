---
cover: /cover-image.jpg
title: "Debugging ssh+svn"
link: "https://www.halkeye.net/2010/07/09/debugging-sshsvn/"
author: "halkeye"
description: ""
post_id: "388"
date: "2010/07/09 08:31:46"
date_gmt: "2010/07/09 15:31:46"
comment_status: "open"
post_name: "debugging-sshsvn"
status: "publish"
category: "Linux"
tags: ['debug', 'ssh', 'ssh+svn', 'svn']
post_type: "post"
---

Posting here in case anyone else needs to know. Was trying to debug a ssh+svn connection. There is a very simple way to get debugging turned on: 
    
    
    $ export SVN_SSH="ssh -v "
    $ svn checkout svn+ssh://

Any other ssh commands can be put in that env variable too, so ports and such.