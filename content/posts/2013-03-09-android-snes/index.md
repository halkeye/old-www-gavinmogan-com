---
title: "Android and SNES? Oh my!"
author: "halkeye"
post_id: "479"
date: "2013/03/09 21:49:29"
post_name: "android-snes"
status: "publish"
category: "Gaming"
tags: ['android', 'gamepad', 'nexus 7', 'snes']
---

So a while ago (Dec 2012, so only a couple months :D) I posted a little picture of a setup I got working with my nexus 7.

![](2012-12-27-16.50.34.jpg)

I promised I would document how I did it for others, and so I'll  best to explain what / how I got it working but it's been a long time since I did any sort of technical writing, so bear with me.

So what do you need? This is what I used, this is by no means the only way.


1.  Gamepad (I used one of the snes gamepads I bought from a local game store. There are tons of tutorials online on how to convert an old snes controller to a usb one)
2.  [MicroUSB OTG Adapter](https://www.monoprice.com/products/product.asp?c_id=108&cp_id=10833&cs_id=1083314&p_id=9724&seq=1&format=2) \- As linked
3.  Android Device that has OTG support. I know my Galaxy Nexus and Nexus 7 both support them.
4.  I used [USB/BT Joystick Center](https://play.google.com/store/apps/details?id=com.poke64738.usbjoy) in the end. Its pretty expensive, has some sort of online DRM (but seems to work offline, just can't edit joysticks). I've heard you can do it with root/this app, but this is what I used for my un-rooted tablet. There is a demo version available that lets you test compatibility before spending the money.
5.  A "game" you want to run. I use [SNESDroid](https://play.google.com/store/apps/details?id=ca.halsafar.snesdroid) for that


All in all I would say it's not exactly a hard process. Joystick Center is expensive and a very dev-ie UI but it's quite simple once you figure it out. It is essentially a tool to make drivers for your usb gamepad for your android device. It seems to do a good job at that.

Once you get everything hooked up and Joystick center installed and running, you need to make sure it finds the gamepad. It's a bit finicky, especially if you have other USB apps installed. Once you have the app running and find the device you see something like:

![](Screenshot_2013-03-09-21-22-11.png)
 

Next you need to select that device. When that is done, you'll see another row. This row confused me the most. It's not that important other than the driver button on the left hand side. Once you've clicked/tapped the **driver** button, you'll come across a screen kind like:

![](Screenshot_2013-03-09-21-22-26.png)

This would be the most important screen. It took me a few trues and a few videos to figure everything out but it's actually quite simple.

First you'll want to add your directional support. Since my gamepad has a dpad, I added a "stick" control. This is the second button on the right side of the big + indicator on the left side of the screen (confusing no?). My gamepad also has 8 buttons so I added 8 of those (first button next to +).

Now for each "feature" you will select them once at a time and configure it. It does't matter at all which order you added/do things in.

First I selected my stick. On your gamepad move the dpad/control stick around. For every light / box that changes (from on to off or whatever) highlight it. I ended up having 16 boxes selected. After selecting move the dpad around again, you should see the stick box move around properly. Make sure to try out all directions.

Next comes the easy buttons. Select a button. Press a button on the gamepad repeatedly. Highlight any boxes that change. Repeat for next button.

By the time you are all done, any time you press an existing button or move the dpad, it should jump to the properly button in app. If that's all correct, hit back. I would press "Exp" on the main screen to save your configs, but so far mine has never gone away.

Now fire up your game. For me SNES droid has the ability to remap keys. So I go into the settings and map each button press to a key.

So there you have it, now you can play games with your gamepad on your android device.

 

 

From what I read, you can actually use the app to map buttons to actual key presses, so its possible to play regular games, but I never exactly figured out how to do that (not needed for snes).

## Comments

**[Yuritau](#5626 "2013-03-09 23:17:12"):** I'm hopeful that the OUYA controller will be compatible with android devices, or that someone will make and share a tool that makes it so.

**[halkeye](#5627 "2013-03-09 23:19:37"):** I'll bet its a bluetooth controller. If so, the tool I mentioned will still work for it.

I know I can't wait for mine (ouya). I'm going to be trying to get salty stories to run on it if I can.

