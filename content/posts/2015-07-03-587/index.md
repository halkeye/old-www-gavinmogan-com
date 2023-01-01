---
title: "Bash Remove Extension"
author: "halkeye"
post_id: "587"
date: "2015/07/03 01:28:19"
post_name: "587"
status: "publish"
category: "Linux"
tags: []
cover: "/assets/cover-image.jpg"
---

I can't imagine me ever needing this again, but it does highlight bash's ability to strip extensions.

To convert avis to mkv's and update language from unknown to english:

```bash
for i in *.avi; do
  mkvmerge -o "${i%.avi}.mkv" "$i" \
  && mkvpropedit "${i%.avi}.mkv" --edit track:a1 \
  --set language=rus --edit track:a2 --set language=eng;
done
```
