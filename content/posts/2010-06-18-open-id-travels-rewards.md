---
title: "Open ID Travels and rewards."
author: "halkeye"
post_id: "386"
date: "2010/06/18 00:54:45"
post_name: "open-id-travels-rewards"
status: "publish"
category: "Coding"
tags: ['Coding', 'Net::OpenID::Consumer', 'openid', 'perl', 'php']
cover: "cover-image.jpg"
---

So the last couple of weeks I've been playing with openid again trying to get the google federated logins working. I thought it would be a sweet setup for some of my little tools that I have to have logins for, but am too lazy to deal with user management.

So far its been an eye opener. Its not really as transparent as I thought. You still need some sort of storage system to store openid keys. I sorta cheated, since my apps are only using google logins, and I can "require" emails, I just made a little config file with emails in them.

Last project was php, ended up later being kohana v3, which has all the error/warning levels turn right up full. Which is awesome. Except the one openid library I could find was pretty heavily written for php4, and when php5 code used it, it would error like mad. But the samples and everything worked out the box. Started to port/upgrade, got tired, started to look for other libs. Found a ported version of the lib, but it seemed to fail every time I used it. Tried out janrain's service rpxnow. But considering you had to set up a new setup each time to point to the different boxes, it didn't seem like a good plan for an "easy to deploy system. Finally settled on [lightopenid](https://gitorious.org/lightopenid) which turned out to be very simple and easy to setup.

Fast forward to tonight.

Tonight was perl night. Had an old script I figured I could turn into a web interface. Wanted an excuse to play with [dancer](https://perldancer.org) anyways. Go check on cpan, find out that Martin Atkins (one of the ones I worked with while volunteering with livejournal) released, or at least helped out with [Net::OpenID::Consumer](https://search.cpan.org/~mart/Net-OpenID-Consumer-1.03/lib/Net/OpenID/Consumer.pm). Figured sweet, cpan modules seem more hardened and easier to use than php libs, so I figured it would be easy to setup.

Whoa was I mistaken.

Started off simple. Copy and pasted the example code into a .cgi file for testing.

Oh, missing modules, okay, it was more pseudo code, so no worries.

Added use statements, installed modules.

Hrm, nope, still no go.

Oh, the `$csr->claimed_identity("https://www.google.com/accounts/o8/id")` and `$claimed_identity->check_url` calls only need to be made once? Okay, that was commented, but not really clear, no worries, simple little fix.

Yay! now its redirecting and returning just fine. Oh wait, its complaining about bad_mode, something about **setup_needed**.

Fast forward a couple hours, after much googling, and reading code, and looking at other implementations, and my favorite codesearch.google.com I could find nothing. Still nothing about this setup_needed. More googling. Found an unanswered mailing list post by Martin. But still nothing.

Finally, flash of random insight. What other modules are used? Looked a bit more closely at the code. Net::OpenID::ClaimedIdentity which leads me to the documentation. Vaguely it made clear to me that if you are not using an ajax popup, you should set "delayed_return" which means the openid provider (google) can take control of user, and popup any sort of validation it needs. Which google does at least the first time you request it from a new trust_root (learned that from my work on the php code).

Quickly updated my code to the following:


```perl
my $check_url = $claimed_identity->check_url(
  delayed_return => 1,
  return_to  => "http://localhost/cgi-bin/test.cgi?yourarg=val",
  trust_root => "http://localhost/",
);
```

Ran my test again. Everything is golden. Works perfectly out of the box. Next I need to look at AX support, and moving the code into dancer (or something else).

I'm hoping that since I had trouble, and figured it out, someone else can find this post for searching and hopefully reduce someones frustrations.
