---
title: "MTLJPost 1.0.3 Released"
link: "https://www.halkeye.net/2004/01/30/mtljpost_1_0_3_released/"
author: "halkeye"
description: ""
post_id: "102"
date: "2004/01/30 21:36:01"
date_gmt: "2004/01/30 21:36:01"
comment_status: "open"
post_name: "mtljpost_1_0_3_released"
status: "publish"
category: "Coding"
tags: []
cover: ""
post_type: "post"
---

<s>1.0.3</s>1.0.4 Released

[Download New Version](http://www.halkeye.net/files/?file=MTLJPost.1.0.4.tgz)

```

# 1.0.3 - January 30, 2004  

# - Entries will now edit after the inital post.  

# - If an entry doesn't save to livejournal, just hit save again  

# - Added support for exerpts / lj-cut  

# - Date of LJ post is date of Actual Entry. You'll have to watch out for backdated entries  

# If its a problem, set the date to now, post, then reset to old.  

# Temp Fix
```

Not sure how much more needs to be done. This was very fun to work on, and it works cleanly. I'm pretty sure it would work cleanly with any other plugins, but who knows.

Any suggestions on what should be done next?

**Edit:** This is an edit, and it works, see, not a new post, and it shows up.

**Edit:** 1.0.4 was released quietly because there was a backdating issue so you couldn't save old entries.. this should fix it..

**Edit:** Another release of 1.0.4.. Should fix the bug that I only seemed to get once... weird, I wish I could repeat that bug. So download the new version. or check the extended entry for more information.--------------  

Try Fix:  

replace:  

`if (defined $entry->text_more && $entry->text_mode ne "") {`

with  

`unless ( defined($entry->text_more) && $entry->text_more =~ /^\s*$/s ) {`

## Comments

**[Kristian](#56 "2004-01-31 08:18:07"):** MT::App::CMS=HASH(0x8379af4) Use of uninitialized value in string ne at plugins/MTLJPost.pl line 114.

MT::App::CMS=HASH(0x8379af4) Use of uninitialized value in join or string at (eval 21) line 2.

114 looks like something about extended entries... NFI how there can be an error on line 2...

**[Kristian](#57 "2004-01-31 08:52:23"):** Just a random thought that popped in my head -- you don't think it would cause a problem if I'm using a non-standard text formatter, right? I use Textile in my MT installation.

**[Gavin](#58 "2004-01-31 11:23:55"):** replace:
if (defined $entry->text_more && $entry->text_mode ne "") {
with
unless ( defined($entry->text_more) && $entry->text_more =~ /^\s*$/s ) }

and tell me if that fixes things..

And text formatters shouldn't care.. I'm using a custom one too to do my lj user tags.. (speaking of which..

