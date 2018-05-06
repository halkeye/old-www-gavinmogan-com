---
title: "Mailserver Update Update"
link: "https://www.halkeye.net/2004/01/20/mailserver_update_update/"
author: "halkeye"
description: ""
post_id: "109"
date: "2004/01/20 14:22:21"
date_gmt: "2004/01/20 14:22:21"
comment_status: "open"
post_name: "mailserver_update_update"
status: "publish"
category: "Linux"
tags: []
cover: "/cover-image.jpg"
post_type: "post"
---

[14:13] @galimon> Jan 20 14:09:53 oinkpig postfix/smtp[24044]: D99ED2AD623: to=<gaveye@hotmail.com>, relay=shawmail.cg.shawcable.net[24.71.223.43], delay=1, status=sent (250 2.5.0 Ok.)  

[14:13] @galimon> SCREW YOU BLOCKLISTING ANY CABLE IPS! I GOT THROUGH YOU!  

[14:14] iMag> ?  

[14:14] @galimon> um, mail hosts have started to block all dynamic ips  

[14:14] @galimon> which is average cable and dsl users  

[14:14] @galimon> so i have started to be unable to send out email, i guess for the last week or so to any of the popular mail hosts  

[14:15] @galimon> but i've just fixed it i think.  

[14:16] iMag> for web based email sites?  

[14:16] @galimon> well, i've had a university email host return my email  

[14:17] @galimon> hotmail just says "yea, we accepted your email" then doesn't deliver it  

[14:17] @galimon> its on the open relay blacklists now  

[14:18] iMag> I generally use my shaw account  

[14:18] @galimon> i run my email server out of halkeye.net  

[14:18] @galimon> specificly 'cause i was annoyed at being unable to send emails though shaw's server from school  

[14:18] @galimon> at least before the web interface, and even then, i wanted to use my laptop

I'm So happy to actually get this working. Now my mail server will not be blocked from other servers...   

Hotmail pissed me off the most. It would say "Yes yes, code 250, we accepted and will deliver" but then it never actually delivers.. I would never have known if oregonstate wasn't rejecting my emails...

halkeye@oinkpig halkeye $ telnet smtp3.oregonstate.edu smtp  
  

Trying 128.193.0.12...  
  

Connected to smtp3.oregonstate.edu.  
  

Escape character is '^]'.  
  

554 Service unavailable; [24.87.47.123] blocked using dul.dnsbl.sorbs.net, reason: Dynamic IP Address See: http://www.dnsbl.sorbs.net/cgi-bin/lookup?IP=24.87.47.123  


I can't belive the tiny little one liner fix in main.cf for postfix did all this.  

relayhost = shawmail.vc.shawcable.net

Now its alll ppppeeeererrfeeect

Tee Hee Heee