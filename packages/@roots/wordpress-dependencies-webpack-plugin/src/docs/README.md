## Overview

Webpack plugin which parses imports and creates a manifest of scripts which are provided by @wordpress/wordpress (broken down by entrypoint).

You likely want to use this alongside `@roots/wordpress-externals-webpack-plugin` which will externalize wordpress dependencies in your bundled code.

## Installation

```sh
yarn add @roots/wordpress-dependencies-webpack-plugin --dev
```

## Usage

```js
const {
  WordPressDependenciesWebpackPlugin,
} = require('@roots/wordpress-dependencies-webpack-plugin')

// webpack.config.js
module.exports = {
  plugins: [new WordPressDependenciesWebpackPlugin()],
}
```
