---
title: Introducing r.g4v.dev
date: 2020-04-20T00:52:59.999Z
cover: >-
  assets/differences-between-a-dockerfile-docker-image-and-docker-container-001320c81dd8d2989df10d0bec36341fd6a94b043f6f9de1c26ee79eaf16e566.jpg
tags:
  - docker-registry
  - kubernetes
  - helm
post_name: docker-registry-g4v-dev
author: halkeye
category: Linux
---
I am somewhat addicted to making [helm charts](https://github.com/halkeye-helm-charts/) with 57 charts and counting now. And as such, I often find myself building or tweaking docker images to see how they work, or make it easier to deploy.

I'll admit, the effort to go through making a new repo on docker hub, with all that clicking, just to be able to deploy an image to test on my Kubernetes cluster is well.... Okay like 5 clicks, but now I don't have to!

I've always been envious of [@jessfraz](https://twitter.com/jessfraz)'s [docker registry](https://r.j3ss.co/), apparently originally setup when docker hub was super slow, so I've wanted to setup my own for fun. 

🎉🎉🎉🎉 So I'm now introducing [https://r.g4v.dev](https://r.g4v.dev) 🎉🎉🎉🎉

Right now I'm just using it for throw away images. I don't know if I'll ever publish something serious on there since I'm running it out of my apartment.

That being said, moving on to how its done!

## How its done

Basic Docker registry is open source and commonly used, so I started there. The registry speaks HTTP, and there's already a lot of very common instructions out there. I started with [the docker-regstiry helm chart](https://hub.helm.sh/charts/stable/docker-registry) and went from there.

Once installed i found out that essentially out of the box you had 2 modes. Everyone reads/write or Logged in users read/write. For my purposes, I wanted something without credentials to be able to deploy to Kubernetes, so #2 was out, and I didn't want random strangers to write, so #1 was out, unless I keep it beind my firewall.

I did start looking at some of the other systems, Harbor (which i think is a registry), Artifactory, and whatever else I could find. But I kept coming back to the simplicity of docker-registry.

Okay, next steps, cause I've seen it done, how do I get docker-registry to do the right thing. Turns out the auth system, other than http basic, supports open id connect. So I looked into keycloak support. Its actually really cool, docker-regiistry + keycloak work really well. But that didn't allow to me have anonymous reads.

Next I found out about [](https://github.com/cesanta/docker_auth). Its essentially a simple proxy in between. I ended up using ldap as a source, but I could write rules as to which repos could be accessed by which user, including anonymous. Sweet, that so problem was handled.

Next. I wanted a web interface. I've wanted to use [reg server](https://github.com/genuinetools/reg/) for a while, and while i could run them on a separate domain, I wanted them to match up. I knew docker-registry took over /, and all the sub paths by default, so that wasn't going to work out. Well it turns out that docker-registry prefix all of its urls with /v1/ or /v2/. So I changed the mapping to only handle /v1/, everything else goes to reg-server. Bam! that worked out great.

Okay, now that it all works correctly!

Now what? Apparently it supports clair, which is a vulnerability scanner for docker. So off I go again. I found out that clair provides a helm chart, so I figure nice and easy.

Well the version they use is way newer than the one reg-server supports.

Luckily jess fraz published her own version of clair, so I just swapped the image the helm chart was using.

Bam, reports to the images I have.

For those who want to do the exact same setup, all the details are in my helmfile repo, but that's the overall setup. I'm pretty happy with it, I can publish and delete images super fast, since its all local, then when i'm happy, push it up to docker hub.

## TL;DR

TL;DR - https://github.com/halkeye/helmfile/tree/3ecfb76ca06aada5ca5c68e6a4e3ddddd144765d/namespaces/registry