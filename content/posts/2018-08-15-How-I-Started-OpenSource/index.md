---
cover: "./john-schnobrich-520023-unsplash.jpg"
title: "Open source and me"
post_name: "open-source-and-me"
date: "Wed, 15 Aug 2018 21:09:24 -0700"
category: "General"
tags:
  - Open Source
---

Got a tiny little [pull request](https://github.com/halkeye/hubot-brain-redis-hash/pull/33) on a old hubot module I created a while ago, and it reminded me I was going to talk about open source.

## How did I get started with open source? Why is it important to me?

Well, need to go back a little further. I had interest in programming since I was a little kid. I started to play with basic, and my dad turned out to have a how to program in basic book (which I might even still have). My mom was always looking out for oppertunities for me.

I even managed to be the first person in my cub scouts that got the computer badge. I had written a simple program, had a bunch of inputs, asking questions, branching paths depending on what you answered, everything. Turns out the computer badge was really more about "What is a computer? What are inputs, what are outputs". Like 10 questions later I got the badge. At this point I was already starting to poke into anything I could that would be considered programming. I made dos boot disks that would have menus that would launch different games. I made basic apps that would ask you questions and play music. (I wish I made madlibs like the Girls Learning Code workshops did).

In high school 2 more big moments happened.

1) My mom found me a course called wizkids. It ended up teaching c++ to kids. I know I still have the notes they gave me but for the life of me I can't remember what program we made.
2) My dad and I went to Vancouver community college and took a very basic visual basic course. He was trying to learn how to make little programs in excel for his office, and I was happy to come along to learn.

I lucked out.

Come college I got involved with LiveJournal. I joined up because some people in a chat room started talking about it. I liked the sense of community. And the place to vent. Like the early blog posts those early LiveJournal posts were amazingly cringe worthy, but it helped keep things out of my head, and I think after moving away from it lead to more anxiety.

But quickly found out about lj_dev. LiveJournal was mostly open source. They had some of the company logic, like payment processing behind locked doors so others couldn't really compete with them, but the product itself was all open source. I lucked out, they were super friendly. I expressed interest and even had a couple tiny changes assigned to me. By the time I moved on from LiveJournal, I was actually completing bug bounties.

Now from that point onward I'll admit I don't remember the details all that clearly. Previous to GitHub, it was way harder to contribute to projects. LiveJournal used subversion, which was hard to maintain your own copy. Most of the time you would end up getting write access to the branches directory. Submitting patches still involved generating diffs most of the time. It did help me get super comfortable with diffs and the patch tool. Drupal used CVS, then Subversion, and I hear they have now gone to git.

During my time with LiveJournal, I started to self host a blog. I still used LiveJournal a lot, but liked the fun of self hosting. My first job was also in perl (I think having experience with perl, and a cheap new grad, helped me get said job). So I wrote my own blogging software. I knew the basics of mysql from work, plus was super comfortable with the inner workings of mod_perl, and perl from LiveJournal and work. It beyond sucked, but I had a lot of fun writing it.

Eventually I migrated to moveable type. It was also written in perl but had a plugin system. I wrote up a couple plugins to make cross posting to LiveJournal super easy. Whoa! people actually were using it. I put a zip file on my website because it was useful to me. I didn't expect others to use it. This was awesome. Got to meet (online) a bunch of bloggers. Got a bunch of feature requests.

Sharing is essentially second nature to me.

Eventually I got a new job, started learning php, found out about drupal, and just loved how fast it was. How modular it was. Again I started to make plugins. Apparently I wanted self hosted subversion repos to be viewable on my website. So I made a plugin that did directory and file listing. I think it mostly scraped the output of the subversion command, but it was useful to me, so I published it. Shockingly people used it. I got bug reports, feature requests. I was very proud of it. I know I was involved in a couple other plugins, but for the life of me I can't remember what they were.

Eventually I moved on again. At some point wordpress had stabilized. It was no longer being hacked every couple days. It worked well. Required way less maintenance (drupal was awesome, lean and fast, but broke everything every major release. On purpose, but broke everything). I didn't work on plugins for this. This was just it worked, but I did submit bug reports to others. Maybe made a couple local changes.

Then along came GitHub. GitHub let us host everything for free. I ended up being super lazy and retiring the subversion server I ran at home, and started to migrate most of my old projects to GitHub. I've never really had a need to keep secrets, so I didn't have a need to keep these random projects secret. They were not useful to anyone other than me. They were mostly scripts to do the simpliest of things. Posted the old muds I worked on. Posted mtljpost. So many other tiny things. I think i'm up to 200+ repos now.

With GitHub, it became super easy to do the smallest of changes. Many documentation patches. Many minor things.

> "I adopted the attitude of I don't care if this is useful to you, its useful for me, so I wanted to share it"

The above is a phrase I mentioned to someone recently. I think its a pretty accurate description of my open source stuff. I've contributed major patches to projects. [I did some fairly big refactoring to sonarr to add twitter support](https://github.com/Sonarr/Sonarr/commits?author=halkeye). [I submitted a patch last week that just updated a link in the documentation](https://github.com/discourse/discourse-push-notifications/pull/24). I've reported bugs for behaviors I couldn't figure out [how to reproduce](https://github.com/gatsbyjs/gatsby/issues/5486) but provided as much information as I can.

To summarize, I wish I could remember way more details but:

* I keep using the word lucky, and I was. I had a lot of great people help me out along the way, even just the little things of giving feedback on change requests. BradFitz got me to rewrite so many patches. He could have probably done them himself in less time, but let me learn from him, even gave me pointers on how to solve problems.
* I was lucky that nobody really judged me
* I was lucky I had the attitude of "I'm sharing things I care about"
* Now its second nature to me. I want to help everyone I can. I volunteer when I can. I code review when I can.
* I probably submit ~5 patches to open source projects every month. They are often super tiny, but I always try and help where I can, and since its more "this could be helpful" and not "you need this", then if it never gets accepted, I don't have any ego attached to it.

Cover Image by: <a style="background-color:black;color:white;text-decoration:none;padding:4px 6px;font-family:-apple-system, BlinkMacSystemFont, &quot;San Francisco&quot;, &quot;Helvetica Neue&quot;, Helvetica, Ubuntu, Roboto, Noto, &quot;Segoe UI&quot;, Arial, sans-serif;font-size:12px;font-weight:bold;line-height:1.2;display:inline-block;border-radius:3px" href="https://unsplash.com/@johnschno?utm_medium=referral&amp;utm_campaign=photographer-credit&amp;utm_content=creditBadge" target="_blank" rel="noopener noreferrer" title="Download free do whatever you want high-resolution photos from John Schnobrich"><span style="display:inline-block;padding:2px 3px"><svg xmlns="http://www.w3.org/2000/svg" style="height:12px;width:auto;position:relative;vertical-align:middle;top:-1px;fill:white" viewBox="0 0 32 32"><title>unsplash-logo</title><path d="M20.8 18.1c0 2.7-2.2 4.8-4.8 4.8s-4.8-2.1-4.8-4.8c0-2.7 2.2-4.8 4.8-4.8 2.7.1 4.8 2.2 4.8 4.8zm11.2-7.4v14.9c0 2.3-1.9 4.3-4.3 4.3h-23.4c-2.4 0-4.3-1.9-4.3-4.3v-15c0-2.3 1.9-4.3 4.3-4.3h3.7l.8-2.3c.4-1.1 1.7-2 2.9-2h8.6c1.2 0 2.5.9 2.9 2l.8 2.4h3.7c2.4 0 4.3 1.9 4.3 4.3zm-8.6 7.5c0-4.1-3.3-7.5-7.5-7.5-4.1 0-7.5 3.4-7.5 7.5s3.3 7.5 7.5 7.5c4.2-.1 7.5-3.4 7.5-7.5z"></path></svg></span><span style="display:inline-block;padding:2px 3px">John Schnobrich</span></a>
