## Overview

> Adds sass support to [@roots/bud]([[base]]/README.md) projects.

- [Requirements](#Requirements)
- [Installation](#Installation)
- [Usage](#Usage)

## Requirements

[@roots/bud-sass]([[base]]/packages/@roots/bud-sass) requires sass and `@roots/bud-postcss` to be installed as peer dependencies.

```sh
yarn add sass @roots/bud-postcss --dev
```

## Installation

```sh
yarn add @roots/bud-sass --dev
```

## Usage

Make sure that `@roots/bud-postcss` is also included in your configuration.

```js
module.exports = app =>
  app
    .use(['@roots/bud-postcss', '@roots/bud-sass'])
    .entry('app', ['app.css'])
```
