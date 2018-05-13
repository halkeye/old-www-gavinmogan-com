---
title: "Bash prompt linewrap with colors issues"
author: "halkeye"
description: ""
post_id: "530"
date: "2014/03/19 13:35:51"
date_gmt: "2014/03/19 20:35:51"
comment_status: "open"
post_name: "bash-prompt-linewrap-colors-issues"
status: "publish"
category: "Linux"
tags: ['bash', 'linux', 'prompt']
cover: "../cover-image.jpg"
post_type: "post"
---

So I've been fighting with trying to make a custom color prompt for a while now.

I've recently found out about tput to output color codes. That combined with local variables meant prompts became easier to read.

```bash
  local BG_RED=$(tput setab 1)
```

We started to create a custom prompt here for the team. Had all the info needed at a quick glance. Everything was good except long lines didn't wrap properly. Ctrl+r would just get nutty. 

So, after a lot of research and reading various forum posts, I found out that color codes should be wrapped in "`\\[...\\]`". So example:

```bash
  local BG_CYAN=$(tput setab 6)
  local FG_GREEN=$(tput setaf 2)
  local RESET=$(tput sgr0)

  export PS1="\[${BG_CYAN}${FG_GREEN}\]\u@\h \[${RESET}\]$"
```

Note the `\\[` and `\\]` wrapping the codes. This allows bash to properly figure out the length of the line. Note: I just grabbed random colors, I suspect this example looks bad.

I did find a slight exception

For the TITLEBAR (putty/xterm/screen) support:

```bash
case $TERM in
    xterm*|rxvt*)
      TITLEBAR="\[33]0;\u@\h:\w07\]"
      ;;
    screen*)
      TITLEBAR="\[33k\u$\h\]"
      ;;
    *)
      TITLEBAR=''
      ;;
  esac
```

The \[ and \] should wrap the entire block as everything inside is considered part of the control code.
