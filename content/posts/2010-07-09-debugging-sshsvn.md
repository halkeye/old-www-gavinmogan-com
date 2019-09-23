---
title: "Debugging ssh+svn"
author: "halkeye"
post_id: "388"
date: "2010/07/09 08:31:46"
post_name: "debugging-sshsvn"
status: "publish"
category: "Linux"
tags: ['debug', 'ssh', 'ssh+svn', 'svn']
cover: "../cover-image.jpg"
---

Posting here in case anyone else needs to know.

Was trying to debug a ssh+svn connection. There is a very simple way to get debugging turned on:

```bash
$ export SVN_SSH="ssh -v "
$ svn checkout svn+ssh://
```

Any other ssh commands can be put in that env variable too, so ports and such.
