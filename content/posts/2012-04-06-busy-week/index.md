---
title: "Busy Week here"
author: "halkeye"
post_id: "453"
date: "2012/04/06 16:46:08"
post_name: "busy-week"
status: "publish"
category: "Work"
tags: []
cover: "../cover-image.jpg"
---

Got lots of things committed this week.

[Gitolite support for Gitalist](https://github.com/halkeye/Gitalist-Git-CollectionOfRepositories-Gitolite)

[RetweetBot](https://github.com/halkeye/RetweetBot) has been upgraded. It now has a ruby script to grab latest events from meetup.com group, and post them to twitter. It was a good excuse to learn ruby. Try out gems and some modules.

[Redmine auto-watcher patch](https://github.com/halkeye/redmine_auto_watchers) \- Very minor patch to support redmine 1.32

[Collectd write_graphite patch](https://github.com/collectd/collectd/pull/66#issuecomment-4959989) \- We at $work are just starting to play with collectd/graphite and before the 5.1 release we were using an older python module. Dusted off my C to add a few config options to keep the new C version outputting the same as the old python version.

[mongo-c-driver very minor patch](https://github.com/halkeye/mongo-c-driver/commit/a2597976a5771f218aab26e311360a5e6f4a8804) (the most minor of them all) to fix Makefile to output proper .so files (and learned a bit more about how .so files work)

And lastly,
[puppet-module-supervisor](https://github.com/plathrop/puppet-module-supervisor) minor patch to the awesome module so puppet can manage our supervisor daemons.

Lots of open source work this week, I hope even more, its been too long.
