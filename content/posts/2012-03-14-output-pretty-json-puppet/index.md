---
title: "How to output pretty json in puppet"
author: "halkeye"
description: ""
post_id: "444"
date: "2012/03/14 11:12:00"
date_gmt: "2012/03/14 18:12:00"
comment_status: "open"
post_name: "output-pretty-json-puppet"
status: "publish"
category: "Linux"
tags: []
cover: "../cover-image.jpg"
post_type: "post"
---

It kept seeming like it should be straight forward. Various attempts by myself (mostly because I don't know ruby) seemed to fail. I'm just leaving it here now that I figured out how to get it working so I can find it again (and hopefully help others).

<s>

**init.pp**

`
$config_data = { "foo" => "bar" }
`

**template.erb**

`
<%= require "json"; JSON.pretty_generate config_data %>
`

I found config_data.to_json wasn't going to work for me because it seemed to output things in different orders each run.

(it was <https://snippets.aktagon.com/snippets/412-How-to-pretty-print-JSON-data-with-Ruby> that helped me figure this out)

**Edit:** While pretty, still doesn't sort so puppet can update the config file each run :( I will figure this out.
</s>

**Edit:** After much trial and error, I ended writing my own library. <https://gist.github.com/2287885>

<github-gist id="halkeye/2287885"></github-gist>
