---
title: Export Dropbox
date: 2018-04-07T07:00:00.000Z
cover: assets/cover-image.jpg
tags:
  - linux
  - dropbox
post_name: export-dropbox-to-disk
author: halkeye
category: Linux
---
(I found this old post, I don't know if I ever finished it, but figured its worth sharing)

I found this cool little golang utility to work with dropbox called [dbxcli](https://github.com/dropbox/dbxcli). Download a recent release from the releases tab.

```
dbxcli account
```

Follow the onscreen instructions to pair to your account.

Then comes the fun bashy magic.

First we need to pick a directory to export to. I used $HOME/Dropbox
```
mkdir $HOME/Dropbox
```

Now goto that directory
```
cd $HOME/Dropbox
```

Export a list of all files
```
dbxcli ls -R -l > files.txt
```

Create all the directories that are needed
```
grep -- "-             -        -" ../files.txt | cut -c38- | perl -pi -e 's/  //g' | while read DIR; do mkdir -p "$PWD$DIR"; done
```

The first grep grabs anything with the 3 dashes, which seems to be how directories are listed. Strip out that chunk with cut, and remove all the extra spaces with perl then finally read each line and make the directory

```
grep -v -- "-             -        -" ../files.txt | tr '\t' ' ' | cut -c38- | perl -pi -e 's/  +//' | while read FILE; do dbxcli get "$FILE" "$PWD$FILE"; done
```

Same as above, but filter out only the hyphenated rows, leave everything else. Then tell dbxcli to grab those files.

And we wait for a while