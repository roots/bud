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
  <strong>@roots/bud-wordpress-externals</strong>
</h1>

## Overview

Bud extension implementing `@roots/wordpress-externals-webpack-plugin`.

It generates a JSON manifest containing WordPress script
dependencies indexed by entrypoint.

Intended to be used as an alternative to `@wordpress/dependency-extraction-manifest-plugin`.

## Installation

```sh
yarn add @roots/bud-wordpress-externals --dev
```

## Usage

```js
bud.use(['@roots/bud-wordpress-externals'])
```

## Configuration

```js
bud.entrypoints({
  name: 'wordpress.json',
  writeToFileEmit: true,
  useElementAsReact: true,
})
```

| Option            | Type      | Description                         | Default          |
| ----------------- | --------- | ----------------------------------- | ---------------- |
| name              | `string`  | manifest filename                   | `wordpress.json` |
| writeToFileEmit   | `boolean` | `true` to emit manifest file        | `true`           |
| useElementAsReact | `boolean` | `true` to compile with `wp-element` | `true`           |

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
