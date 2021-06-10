<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://www.npmjs.com/package/@roots/entrypoints-webpack-plugin">
    <img src="https://img.shields.io/npm/v/@roots/entrypoints-webpack-plugin.svg?color=%23525ddc&style=flat-square" />
  </a>
  <a href="https://codeclimate.com/github/roots/bud-support/maintainability">
    <img src="https://img.shields.io/codeclimate/maintainability/roots/bud-support?color=%23525ddc&style=flat-square" />
  </a>
  <a href="Typescript" src="https://github.com/roots/bud/tree/stable/typings">
    <img src="https://img.shields.io/badge/typings-%40roots%2Fbud--typings-%23525ddc" />
  </a>
  <a href="https://twitter.com/rootswp">
    <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
  </a>
</p>

<h1 align="center">
  <strong>@roots/entrypoints-webpack-plugin</strong>
</h1>

> Manifest with assets grouped by entrypoint

- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Output](#output)
- [WordPress example implementation](#wordpress-example-implementation)
- [Contributing](#contributing)
- [Bud sponsors](#bud-sponsors)
- [Community](#community)

## Overview

Intended for use in environments where a separate, server-side process handles enqueuing assets for the client (see: [**@wordpress/wordpress**](https://github.com/wordpress/wordpress) or [**@laravel/laravel**](https://github.com/laravel/laravel)).

[**@roots/entrypoints-webpack-plugin**](https://github.com/roots/bud/tree/stable/packages/@roots/entrypoints-webpack-plugin) is a vanilla Webpack plugin and can be used outside of [**@roots/bud**](https://github.com/roots/bud/tree/stable/packages/@roots/bud) projects.

If you want to use it with [**@roots/bud**](https://github.com/roots/bud/tree/stable/packages/@roots/bud), you should instead use [**@roots/bud-entrypoints-webpack-plugin**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-entrypoints-webpack-plugin), which wraps this plugin.

## Installation

```sh
yarn add @roots/entrypoints-webpack-plugin --dev
```

## Usage

```js
import { EntrypointsWebpackPlugin } from "@roots/entrypoints-webpack-plugin";

webpack({
  plugins: [new EntrypointsWebpackPlugin()],
});
```

## Output

Assets are separated by entrypoint name, and then by filetype. The `runtimeChunk`, if used, will be the first item in the entrypoint js assets array.

```json
{
  "app": {
    "js": ["runtime.9ffe4f626b6ffca53bd1.js", "app.d4e917b74a97bb0fe9ad.js"],
    "css": ["app.bcaf7e71ef4356832914.css"]
  },
  "editor": {
    "js": ["runtime.9ffe4f626b6ffca53bd1.js", "editor.a22827c63d6d9e772ea1.js"],
    "css": ["editor.ec414c4a744ec7bcb597.css"]
  },
  "customizer": {
    "js": [
      "runtime.9ffe4f626b6ffca53bd1.js",
      "customizer.8d9da55b6e4e522dfe4b.js"
    ]
  }
}
```

## WordPress example implementation

This is a bad implementation but [**@roots/sage**](https://github.com/roots/sage) comes with an implementation that is quite good.

```php
if (!$path = realpath(get_theme_file_path('dist/entrypoints.json')) {
    throw new \WP_Error('Run yarn build');
}

Collection::make(json_decode(file_get_contents($path)))->each(
    function ($entrypoint, $name) {
        Collection::make($entrypoint->js)->each(
            function ($asset) use ($name) {
                wp_enqueue_script(...[
                    "$name/$asset",
                    get_template_directory_uri("dist/$asset"),
                    [],
                    null,
                ]);
            }
        )
    }
);
```

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

<a href="https://kinsta.com/?kaid=OFDHAJIXUDIV">
  <img src="https://cdn.roots.io/app/uploads/kinsta.svg" alt="Kinsta" width="200" height="150">
</a>
<a href="https://k-m.com/">
  <img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150">
</a>
<a href="https://carrot.com/">
  <img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="200" height="150">
</a>
<a href="https://www.c21redwood.com/">
  <img src="https://cdn.roots.io/app/uploads/c21redwood.svg" alt="C21 Redwood Realty" width="200" height="150">
</a>
<a href="https://wordpress.com/">
  <img src="https://cdn.roots.io/app/uploads/wordpress.svg" alt="WordPress.com" width="200" height="150">
</a>
<a href="https://icons8.com/">
  <img src="https://cdn.roots.io/app/uploads/icons8.svg" alt="Icons8" width="200" height="150">
</a>
<a href="https://www.harnessup.com/">
  <img src="https://cdn.roots.io/app/uploads/harness-software.svg" alt="Harness Software" width="200" height="150">
</a>
<a href="https://www.codersclan.com/">
  <img src="https://cdn.roots.io/app/uploads/coders-clan.svg" alt="Coders Clan" width="200" height="150">
</a>
<a href="https://generodigital.com/">
  <img src="https://cdn.roots.io/app/uploads/genero.svg" alt="Genero" width="200" height="150">
</a>
<a href="https://motto.ca/roots">
  <img src="https://cdn.roots.io/app/uploads/motto.svg" alt="Motto" width="200" height="150">
</a>

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)
