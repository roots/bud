## Overview

@roots/bud-preset-recommended is an ideal starting point for all kinds of projects.

## Installation

```sh
yarn add @roots/bud-preset-recommended --dev
```

The preset requires `postcss` to be installed in your project. You can install it automatically by passing the `--install` flag along with your first build.

```sh
yarn bud build production --install
```

You may need to restart the build after installation. But, hopefully not 🤞.

## Usage

```js
module.exports = app =>
  app
    .use(require('@roots/bud-preset'))
    .entry('app', ['app.js', 'app.css'])
```
