## Overview

Webpack plugin which parses asset imports and replace scripts which are provided by `@wordpress/wordpress` with their window alias.

You likely want to use this alongside `@roots/wordpress-dependencies-webpack-plugin`

This plugin is standalone and can be used separately from the Bud framework.

## Installation

```sh
yarn add @roots/wordpress-externals-webpack-plugin --dev
```

## Usage

```js
// webpack.config.js
module.exports = {
  plugins: [new WordPressExternalsPlugin()],
}
```
