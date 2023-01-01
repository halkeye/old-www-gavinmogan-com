---
title: "Sauce Labs Hipchat Service (and Open Source)"
author: "halkeye"
post_id: "989"
date: "2016/10/26 13:17:32"
post_name: "sauce-labs-hipchat-service-and-open-source"
status: "publish"
category: "Work"
tags: ['atlassian', 'hipchat', 'open source', 'sauce labs']
---

I am absolutely ecstatic to announce the new Sauce Labs and HipChat integration being not only released to the public, but open source as well. Its been officially out for a month now, but we just went ahead and open sourced it.

About two months ago now, Atlassian hosted their Atlassian Connect Week out in San Diego. If you do any Atlassian based development, I highly recommend going if you can. It's so much fun to be surrounded by other developers, and be able to ask the original teams questions when you get stuck.

I went into connect week hoping to get a solution for our problem talking to jira server users behind a firewall. Someone had an amazing solution within the first couple hours for me, and I was able to bang out a working prototype in the by the end of the second day.

So what do I do now? I had most of the week left over. Well at a previous internal sauce labs hackathon, I had already started playing around with a slack integration, but was kinda disappointed by its public APIs, so didn't really get very far. I got really excited at the earlier talks about hipchat integration to see how far I could get.

It turned out I could get something done pretty quickly. This time I decided to use the atlassian-connect-express framework so I could focus on just implementing features. And what a good choice that was. By the end of the first day, I had test results showing up in chat. By the end of the week, I had screenshots available, test information, even video working. I had a direct connection to some of the developers, so was able to play around with even more features.

Curious how it looks? But don't really want to install it yet? Checkout this awesome animated gif one of our product team members created.

![take3-short-with-zoom](Take3-Short-with-zoom.gif)

I'm so absolutely excited for this integration, and on top of that, as someone who loves contributing open source, a great example of a working hipchat integration for everyone to learn from and contribute to.

Marketplace: <https://marketplace.atlassian.com/plugins/sauce-hipchat-service/cloud/overview>

Github: <https://github.com/saucelabs/sauce-hipchat-service>
