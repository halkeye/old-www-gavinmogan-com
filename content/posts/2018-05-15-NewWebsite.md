---
title: "New Website"
author: "halkeye"
post_name: "new-website"
category: "General"
tags:
  - Gatsby
  - React
cover: "branko-stancevic-417172-unsplash.jpg"
date: "2018/05/15 20:00:00"
---

If you are seeing this, then the brand new website is fully functional and deployed. Exciting isn't it?


It started as a fun weekend project. I wanted to see how hard it would be to convert my dynamic wordpress blog to something that wouldn't need traditional server to host the content. I'm finding more and more of my VPS is now retireable.


I have loved the idea of static site generators since the days of Movable Type. Dynamic providers such as drupal and wordpress are way easier to maintain. You never had to rebuild your entire site. You can create new content and bam its ready. Comments are super easy too. Everything "just works". The problem is that database lookups are slow. Acces control gets hard. Its super easy to have someone else come in and modify your content. It happened at least once on every site i've worked on. I got super paranoid with halkeye.net. I had a secret username and password to edit the content, and all files on disk were read-only. But yet I had one plugin that had an exploit and bam someone was able to replace content. Movable type was a system that produced a nice fast static site, but had a dynamic admin tool. This let the site be super fast, and still make it easy to edit.

I'm now using gatsby. Gatsby is a static site generate using react. It uses plugins to define all kind of behavior. So you can have plugins that read from other CMSs such as drupal. I chose to use the system that reads from the filesystem. This means I have one markdown file for each post but its super customizable. Plus now I can have the entire website, plugins, configuration and all on GitHub. I love open source so this is a little way of letting me share my current setup. You can check it out - <https://github.com/halkeye/www-gavinmogan-com>

How did I do it?

1) Export every post through the wordpress export system
2) Use the wp2md tool to convert every post to markdown. My fork has a couple minor fixes to allow categories, tags, and a cover image - <https://github.com/halkeye/wp2md>
3) My site has been migrated so many times in the past its kinda a mess. I went through each post and cleaned things up. Using web.archive.org I was able to find old images, even found an old post that was half deleted that I was able to manage to rebuild based on various urls.
4) Celebrate

There was many minor steps in between.

As cringe as some of my early posts were, it was actually pretty fun to go through all the posts.
I tried as best as I could to update formatting and fix images and links.
This blog has been migrated from movable type to my own system to Drupal to WordPress to now Gatsby and probably many more in the future.

Make sure you also check out [/projects](/projects) and [/presentations](/presentations). I'm really happy about the presentations page. Gavinmogan.com started as a site to show off my presentations when I applied at jobs. Its come a long way.


> Cover Photo by [Branko Stancevic](https://unsplash.com/photos/GI1hwOGqGtE?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
