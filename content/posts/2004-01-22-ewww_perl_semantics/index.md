---
title: "Ewww, perl semantics"
author: "halkeye"
description: ""
post_id: "108"
date: "2004/01/22 13:47:02"
date_gmt: "2004/01/22 13:47:02"
comment_status: "open"
post_name: "ewww_perl_semantics"
status: "publish"
category: "Coding"
tags: []
cover: "../cover-image.jpg"
post_type: "post"
---

```perl
if ($var ne "mode")
{
 return errmsg("Mode not set");
}
```
```perl
return errmsg("Mode not set") if ($var ne "mode");
```

```perl
unless ($var eq "mode")
{
 return errmsg("Mode not set");
}
```

```perl
return errmsg("Mode not set") unless ($var eq "mode");
```

Whats the difference between those lines of code? (assuming i wrote them correctly) Absolutly nothing, other than your style.  

That was one of my biggest pet peeve when working on code for them. There was always at least one code reviewer who tried to tell me my code was **WRONG** because I didn't pick the right style.  

return errmsg("Mode not set") unless ($var eq "mode"); I agree with is the best one for readability (Return an error message unless $var is "mode").. Actually I don't think I do even agree with that anymore.. Thats like having instructions:

1) Put peices of bed together  

2) Make sure to unscrew peice A first

Its just not how people naturally read instructions, you want them in order.

Unfortuatly, I have a desire to start working on Livejournal again. I think purely for selfish reasons, because I love working on projects that people actually use..  

And the [Livejournal Portal](https://www.livejournal.com/portal/) is so... overlooked.

I just have no interest in the code politics..  

I guess I'll have to find new projects, or at least finish the ones I've started... like [Dark Warriors](https://www.kodekoan.com/project/darkwarriors).

## Comments

**[Kristian](#6 "2004-01-23 21:08:49"):** Hmm. I think you'd probably be an excellent person to discuss an idea I have with. I gotta give it a proper write-up, though, it's quite disjointed in my head right now.

**[Gavin](#7 "2004-01-23 21:57:16"):** Sounds intreging and fun, and I'm oh so bored.

I've actually started to work on other projects tonight.

