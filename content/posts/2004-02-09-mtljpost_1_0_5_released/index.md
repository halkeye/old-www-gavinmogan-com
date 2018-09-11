---
title: "MTLJPost 1.0.5 Released"
author: "halkeye"
description: ""
post_id: "92"
date: "2004/02/09 23:02:46"
post_name: "mtljpost_1_0_5_released"
status: "publish"
category: "Coding"
tags: []
cover: "../cover-image.jpg"
---

This update is a pretty update. I love the new web interface.
```
# 1.0.5 - Febuary 09, 2004  

# - Started some hooks for MT Plugin Manager  

# - Cleaned up some error messages  

# - Disabled comments  

# - Deletes from livejournal when entry is deleted from MT  

# - Web interface to do configuration /mt-ljpost.cgi
```

Installation Instructions:  

1) Uncompress. tar file should have the right directories.  

2) Upload files:  

mt-ljpost.cgi => mt/  

MTLJPost.pm => mt/extlib/MT/Plugins/ (Might need to create directory)  

MTLJPost.tmpl => mt/tmpl/cms/  

MTLJPost.pl => mt/plugins/  

3) goto the mt-ljpost.cgi and setup your blog  

4) Post  

(I suck at instructions.)

[Download](https://files.halkeye.net/MTLJPost.1.0.5.tgz)

I eventually want to make it so you can post certan categories to certain journals.

Ps: mod_perl installation:  

<Location /mt/mtljpost>  

SetHandler perl-script  

PerlHandler MT::Plugins::MTLJPost  

PerlSetVar MTConfig /var/www/www.halkeye.net/mt/mt.perl.cfg  

</Location>

## Comments

**[Lisa](#48 "2004-04-01 20:31:04"):** Hey,

I'm not sure if you're supporting this, but I installed it and I get this error when I test my settings:

Can't locate object method "new" via package "LJ::Simple" at extlib/MT/Plugins/MTLJPost.pm line 94.

I've uploaded it in ascii to the directory mentioned (extlib/MT/Plugins/) all the cases are correct, as well...

Probably something simple. If you're not updating this not a worry.

Thanks =)

