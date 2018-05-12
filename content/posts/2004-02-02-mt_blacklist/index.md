---
title: "MT-Blacklist."
link: "https://www.halkeye.net/2004/02/02/mt_blacklist/"
author: "halkeye"
description: ""
post_id: "99"
date: "2004/02/02 01:11:50"
date_gmt: "2004/02/02 01:11:50"
comment_status: "open"
post_name: "mt_blacklist"
status: "publish"
category: "Coding"
tags: []
cover: "../cover-image.jpg"
post_type: "post"
---

I actually think I might be able to make MT-Blacklist mod_perl compatible.

Then again.. If I can do it, why hasn't anyone else been able todo it?

I *KNOW* i can do it hackishly..  

but i think i could also do it properly..  

template file and all.

But its really weird, why hasn't anyone else done it?  

All it looks like is that the only problem is that mod_perl doesn't use the CGI library.

I'll have to email them or check the mailing list or whatever sometime tommorow.. I should be able to do it though. Not that I can really tell what the benifits are.

Confused Am I yes!

## Comments

**[nefarious](#61 "2004-05-04 19:36:37"):** Well???? Spill it buddy!!! Googling minds want to know.

MT-Blacklist and mt-search.cgi both crap out with malformed headers under mod_perl. Arrgghh!

**[Gavin](#62 "2004-05-04 20:19:43"):** Its quite easy to make it behave like all the other plugins, and i'm surprised nobody else has done it.

Its because he's trying to use CGI on top of mod_perl doing the same things..

He should move all the output cgi functions to the tmpl files. Its easy, i'm just lazy and lost interest.. sorry.

