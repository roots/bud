## Overview

Webpack plugin which parses imports and creates a manifest of scripts which are provided by @wordpress/wordpress (broken down by entrypoint).

You likely want to use this alongside `@roots/wordpress-externals-webpack-plugin`.

## Usage

```js
// webpack.config.js
module.exports = {
  plugins: [
    new WordPressExternalsPlugin(),
  ],
}
```
