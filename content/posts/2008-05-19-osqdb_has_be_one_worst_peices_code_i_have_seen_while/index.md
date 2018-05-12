---
title: "osqdb has to be one of the worst peices of code I have seen in a while."
link: "https://www.halkeye.net/2008/05/19/osqdb_has_be_one_worst_peices_code_i_have_seen_while/"
author: "halkeye"
description: ""
post_id: "335"
date: "2008/05/19 23:18:00"
date_gmt: "2008/05/19 23:18:00"
comment_status: "open"
post_name: "osqdb_has_be_one_worst_peices_code_i_have_seen_while"
status: "publish"
category: "Coding"
tags: []
cover: "../cover-image.jpg"
post_type: "post"
---

Tonight I was trying to convert the old custom quote system I used for #arc to qdb just for fun. I was trying to find out the code used by qdb.us/bash.org but came across this peice of code called OSQDB.

Here's an exerpt of code called whenever a new quote is added.
```php
$get = mysql_query("SELECT * FROM quotes ORDER BY id DESC LIMIT 1");

while ($count = mysql_fetch_array($get)) {
 $tempid = $count["id"];
}
/* Increment the id */
$newid = $tempid+1;
$sql = mysql_query("INSERT INTO quotes SET id = '$newid'");
$sql = mysql_query("UPDATE quotes SET quote = '$newquote' WHERE id = '$newid'");
$sql = mysql_query("UPDATE quotes SET comment = '$comment' WHERE id = '$newid'");
$sql = mysql_query("UPDATE quotes SET ip = '$ip' WHERE id = '$newid'");
```

1) It loops through 1 entry trying to find the latest entry number (I'm sure max() is faster than order by and limit).
2) Once its it found, it does one insert with the id being set. Then it does 3 more queries setting each field in its own query.

That sorta explains why the db doesn't have auto_increment fields turned on, but its scary. I'm afraid of looking at much more of the code. Luckily I then found [Rash Quote Management System](http://sourceforge.net/projects/rqms/). I don't like this one very much either.. but they are more personal reasons versus code issues.

I should clean up and submit patches (it doesn't seem to have been updated since 2006) for rqms.
