<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img
    alt="MIT License"
    src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square"
  />

  <a href="https://twitter.com/rootswp">
    <img
      alt="Follow Roots"
      src="https://img.shields.io/twitter/follow/rootswp.svg?style=flat-square&color=1da1f2"
    />
  </a>
</p>

<h1 align="center">
  <strong>@roots/bud-mdx</strong>
</h1>

## Overview

Use [MDX](https://mdxjs.com/) in Bud projects.

## Installation

`yarn add @roots/bud-mdx --dev`

## Configuring

Configure directly:

```js
bud.build.items.merge('postcss.options.postcssOptions.plugins', [
  Plugin,
  pluginOptions,
])
```

Add a postcss plugin:

```js
bud.postPlugin(MyPlugin, {plugin: 'options'})
```

Supply a custom presetEnv configuration:

```js
bud.presetEnv({
  autoprefixer: {
    flexbox: 'no-2009',
  },
})
```

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://git.io/JTfPd) to help you get started.

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)
