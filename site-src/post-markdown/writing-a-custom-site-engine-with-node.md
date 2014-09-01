---

title: Writing a custom site engine with Node

---

I have actually been writing a custom static blogging engine in Node this evening.
I've tried to use a minimum amount of tooling, and barebones Node.js. As much as possible, functions are
their own module which returns a promise. This allows for, in my opinion, neat & readable code in the main thread:

![Promise logic in the main thread](http://cl.ly/XImT/Screen%20Shot%202014-09-01%20at%2001.30.44.png)

## Tools

  - Jade
  - Marked
  - Yaml-front-matter
  - Native fs * path modules
  - es6-promise
  - watch
  - live-reload
