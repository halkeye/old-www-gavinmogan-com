---
title: "XARGS FUN!"
author: "halkeye"
post_id: "120"
date: "2003/10/29 22:00:45"
post_name: "xargs_fun"
status: "publish"
category: "Linux"
tags: []
cover: "../cover-image.jpg"
---

I know I havn't been posting much recently, and its been a combo of being sick, being depressed, and .. well.. nothing of interest coming up. But i'm going to try and fix that with some interesting posts.

Yea, today was the first day I ever actually looked at the xargs man page.

I was trying to figure out how to use mv with xargs. I learned so much today. Did you know that xargs doesn't actually pass them all in like a big long string? NOOO, it runs it multple times.  

For Example, find ./ | grep jpg might return:

./gavin1.jpg  

./gavin2.jpg  

./gavin3.jpg

If you run find ./ | grep jpg | xargs -i mv {} pictures/ (which happends to be the proper syntax :D) will run:

mv ./gavin1.jpg pictures/  

mv ./gavin2.jpg pictures/  

mv ./gavin3.jpg pictures/

Which is both good and bad, good that it works, and doesn't have absurdly long file lists (which was the problem i was having, find was returning almost 1500 jpegs), bad if the program you are running (mv in this case) takes a huge amount of time to start/do its work when it might be better to pass in the entire file list :)

Thats my info for the day