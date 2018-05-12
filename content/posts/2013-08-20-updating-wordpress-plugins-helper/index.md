---
title: "Updating Wordpress Plugins Helper"
link: "https://www.halkeye.net/2013/08/20/updating-wordpress-plugins-helper/"
author: "halkeye"
description: ""
post_id: "485"
date: "2013/08/20 16:13:36"
date_gmt: "2013/08/20 23:13:36"
comment_status: "open"
post_name: "updating-wordpress-plugins-helper"
status: "publish"
category: "Web"
tags: []
cover: "../cover-image.jpg"
post_type: "post"
---

Note, I've recently found [WP Cli](http://wp-cli.org/) which makes all of this moot because i can now just do "wp plugin upgrade --all" or "wp plugin install blah"

Original post:

I decided a while ago to put pull all the plugin source codes for this wordpress install directly from subversion. This makes it easier when files need manual patching or more likely, a file gets deleted.



 
  * <http://plugins.svn.wordpress.org/> is the svn root for all the wordpress plugins.

 
  * <http://themes.svn.wordpress.org/> is the svn root for all the themes



So I created this little helper script that I can use to do a mass update when I get too out of date.

<https://gist.github.com/halkeye/6288018>

[gist id=6288018]