## Overview

When utilizing both `@roots/entrypoints-webpack-plugin` and `@roots/wordpress-externals-webpack-plugin` redundant manifests are generated.

This plugin merges the dependencies arrays from `wordpress.json` into the `entrypoints.json` manifest. It then deletes `wordpress.json`.

This plugin can be used separately from the Bud framework.

## Really, three plugins?

Yes, because:

1. `entrypoints.json` has utility outside of WordPress ecosystem.
2. `wordpress.json` has utility even if you don't use `entrypoints.json`
3. If using both plugins then you end up with three manifest artifacts, `entrypoints.json`, `manifest.json` and `wordpress.json`. This is unnecessary.

## Requirements

- `@roots/entrypoints-webpack-plugin`
- `@roots/wordpress-externals-webpack-plugin`

## Usage

```js
// webpack.config.js

module.exports = {
  plugins: [
    // Include required companion plugins.
    new EntrypointsWebpackPlugin(),
    new WordPressExternalsPlugin(),
    // Instantiate the plugin object.
    new MergedManifestPlugin(),
  ],
}
```

## Options

| Option          | type   | Description                                 |
| --------------- | ------ | ------------------------------------------- |
| entrypointsName | string | `entrypoints.json` filename (if customized) |
| wordpressName   | string | `wordpress.json` filename (if customized)   |
| file            | string | filename for final entrypoints manifest     |
