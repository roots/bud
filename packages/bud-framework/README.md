<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://twitter.com/rootswp">
    <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?style=flat-square&color=1da1f2" />
  </a>
</p>

<h1 align="center">
  <strong>@roots/bud-framework</strong>
</h1>

## Overview

This is the core framework leveraged by @roots/bud. You may find it useful in other projects. It's kind of a bootstrap-y laravel/adonis style container-based framework.

## Installation

`yarn add @roots/bud-framework`

## Some things you can do with it

Attach things to it.

```js
import {framework} from '@roots/bud-framework'

framework.apply('method', () => console.log('attach a method to it'))

const instance = new framework

instance.method() // => 'attach a method to it'
```

Log stuff.

```js
instance.logger.info({data: 100}, 'Logged message')
```

Create containers for storing, accessing and manipulating stuff.

```js
instance.bind('things', {
  some: {
    thing: 100,
  },
})

instance.things.get('some.thing')
// => 100

instance.things.set('some.thang', 200)
instance.things.get('some')
// => {some: {thing: 100, thang: 200}}
```

It definitely does other helpful stuff. As this is a lower-level utility it is largely undocumented, at the moment..

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)
