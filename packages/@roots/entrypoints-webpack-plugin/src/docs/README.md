## Overview

Intended for use in environments where a separate, server-side process handles enqueuing assets for the client (see: @wordpress/wordpress or @laravel/laravel).

`@roots/entrypoints-webpack-plugin` is a vanilla Webpack plugin and can be used outside of `@roots/bud` projects.

If you want to use it with `@roots/bud`, you should instead use `@roots/bud-entrypoints-webpack-plugin`, which wraps this plugin.

## Installation

```sh
yarn add @roots/entrypoints-webpack-plugin --dev
```

## Usage

```js
import {EntrypointsWebpackPlugin} from '@roots/entrypoints-webpack-plugin'

webpack({
  plugins: [new EntrypointsWebpackPlugin()],
})
```

## Output

Assets are separated by entrypoint name, and then by filetype. The `runtimeChunk`, if used, will be the first item in the entrypoint js assets array.

```json
{
  "app": {
    "js": [
      "runtime.9ffe4f626b6ffca53bd1.js",
      "app.d4e917b74a97bb0fe9ad.js"
    ],
    "css": ["app.bcaf7e71ef4356832914.css"]
  },
  "editor": {
    "js": [
      "runtime.9ffe4f626b6ffca53bd1.js",
      "editor.a22827c63d6d9e772ea1.js"
    ],
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

This is a bad implementation but @roots/sage comes with an implementation that is quite good.

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
