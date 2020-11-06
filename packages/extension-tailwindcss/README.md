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
  <strong>@roots/bud-tailwindcss</strong>
</h1>

## Overview

A plugin which adds tailwindcss support to @roots/bud projects.

## Installation

```sh
yarn add @roots/bud-tailwindcss --dev
```

## Usage

```js
bud.use('@roots/bud-tailwindcss')
```

You should now be good to utilize tailwind in your project. You can use it with
scss or postcss. The parser used is based on the extension you save the
source file with.

## Configuration

```js
bud.tailwind(...options)
```

Use the `tailwind` config function to specify a tailwindcss file to use in your project.

This only applies if your tailwind file is **not**
locatable in the root of your project with the name `tailwind.config.js`.

If the tailwind config file exists trying to use this
function will cause errors to be thrown.

```js
  bud.tailwind(bud.project('path/to/config.js'))
```

You can also provide your tailwind config as an object, should you prefer.

```js
bud.tailwind({
  theme: ({theme}) => ({
    colors: {},
  }),
})
```

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
