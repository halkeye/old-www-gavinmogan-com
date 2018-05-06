---
cover: /cover-image.jpg
title: "mIRC Scripts.. snippets"
link: "https://www.halkeye.net/2003/08/02/mirc_scripts_sn/"
author: "halkeye"
description: ""
post_id: "343"
date: "2003/08/02 21:54:31"
date_gmt: "2003/08/02 21:54:31"
comment_status: "closed"
post_name: "mirc_scripts_sn"
status: "publish"
category: "Coding"
tags: []
post_type: "post"
---

For those like myself, who use multiple servers and like to keep their nick name synchronized (IE /nick gali|work will set it to all servers) `alias nick { /scid -a /quote nick $1 }` For those who, again, like myself do multiple servers, and like to connect to them at startup, here's a quick snippet for auto-connecting on startup. the -i thing specifies the main and alt nicks the -j specifies auto join channels for the most part, I use mIRC's groups and internal auto-join functionality for channels, but this is nice for servers. 

> on 1:startup:{ /servers } alias servers { .server irc.esper.net -i galimon halkeye -j #cooans_world .server -m irc.choopa.net -i galimon halkeye -j #ranma .server -m irc.lazynet.org -i galimon halkeye -j #livejournal .server -m irc.mircx.com -i galimon halkeye -j #animex } 

My absolute biggest pet peeve as of lately, is the fact that every link seems to open in IE, doesn't matter what browser is set to default. This hack allows you to specify any browser you want. except it only works on www and :// links (although easily expanded to ftp. and whatever else.. Irc. ones even) 

> on ^*:hotlink:*//*.*:*: { } on *:hotlink:*//*.*:*: { run C:\applications\MozillaFirebird\MozillaFirebird.exe $remove( $1,') } on ^*:hotlink:*www.*:*: { } on *:hotlink:*www.*:*: { run C:\applications\MozillaFirebird\MozillaFirebird.exe $remove( $1,') } 

Chris also claims that this works in mIRC 6.01 

> edit mIRC.ini while its closed browser=C:\Program Files\Mozilla Firebird\MozillaFirebird.exe in the [files] section 

These two tidbits are nice when you get lots of dcc receives. The FILERCVD sets the path whenever you receive files. Its not necessary, but its nice for when you sort files based on file types (like default mIRC does i believe, at least with sound vs non-sound). Then you just press **f3** or anything else you change it to, and it opens the directory. 

> on *:FILERCVD:*.*:{ .set %lastdir $nofile($filename) } alias f3 { echo 42 Opening Receive Dir 4 | run %lastdir } 

And my most complex example. Ever get someone mention your nick or name or whatever, and you can't find out where it was from? Or at least something like that. I have my name, and nicks all highlighted through mIRC, and this code records all instance of it. So when i get back from work or school, i can quickly see if i was mentioned (yes, i guess this makes me look vain, but i wrote it long ago when i was doing server admining for channels) Just setup mIRC to do highlighting any way you want, this handles the rest. 

> ; Notify Window Stuff here on 1:text:*:#:{ if ($highlight(. $+ $1-) != $null) { .window -g0lwz @highlight ; aline @highlight $chr(91) $+ $chan $+ $chr(93) $timestamp < $+ $nick $+ > $1- } } on 1:text:*:?:{ if ($highlight(. $+ $1-) != $null) { .window -g0lwz @highlight ; aline @highlight $chr(91) $+ $nick $+ $chr(93) $timestamp < $+ $nick $+ > $1- } } on 1:action:*:#:{ if ($highlight(. $+ $1-) != $null) { .window -g0lwz @highlight; aline @highlight $chr(91) $+ $chan $+ $chr(93) $timestamp < $+ $nick $+ > $1- } } on 1:action:*:?:{ if ($highlight(. $+ $1-) != $null) { .window -g0lwz @highlight; aline @highlight $chr(91) $+ $nick $+ $chr(93) $timestamp < $+ $nick $+ > $1- } }

thanks alot to [Chris](http://www.gushue.net/) for helping me out and giving me some of the tips today.

## Comments

**[Robert](#18 "2003-12-26 01:50:02"):** Hey, Love the scripts. Just what I was looking for to setup connection to multiple servers on connection. Just a note. I used to suffer from all URLs opening in IE even thou Opera was set to default. Since I upgraded to v6.12 the problem appears to have disappeared. :)

