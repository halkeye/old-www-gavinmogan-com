---
title: "Git+push notification with Gitolite and Jenkins"
author: "halkeye"
description: ""
post_id: "437"
date: "2012/02/17 18:24:06"
comment_status: "open"
post_name: "gitpush-notification-gitolite-andjenkins"
status: "publish"
category: "General"
tags: ['git', 'gitolite', 'jenkins']
cover: "../cover-image.jpg"
post_type: "post"
---

Its so easy now to support [jenkins](https://jenkins-ci.org/)+git with [gitolite](https://github.com/sitaramc/gitolite). No more having git polling per project and slamming the git server with ssh requests.

To install:
Edit .gitolite/hooks/common/post-receive file [^1]

Add:
`
curl -s http:///git/notifyCommit?url=/${GL_REPO}.git
`

For me, my git prefix is: "ssh://git@git.kodekoan.com"

Its that simple.

[^1]: .gitolite/hooks/common/post-receive should be symlinked in every repo you have. I think you needed to set it up before you created a repo though)
