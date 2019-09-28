---
title: "Renaming batch of files (with spaces) in linux"
author: "halkeye"
post_id: "491"
date: "2013/09/28 22:26:57"
post_name: "renaming-batch-files-spaces-linux"
status: "publish"
category: "Linux"
tags: []
cover: "/assets/cover-image.jpg"
---

I rename a lot of files. Often by hand as it's just easier. I've tried various combinations of find -print0 | xargs -0, and find -exec, without much luck.

Just So I have reference on what does work:

```
find -type f | while read file; do echo mv \"$file\" \"$(echo $file | sed -e 's/^Old Content/New Content/')\"; done | sh
```


Yea I could probably drop the echo mv, and the |sh, but it feels safer to do a dry run
