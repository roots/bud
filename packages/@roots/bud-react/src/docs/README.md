## Overview

> Adds react support to [@roots/bud]([[base]]/README.md) projects.

- [Requirements](#Requirements)
- [Installation](#Installation)
- [Usage](#Usage)

## Requirements

[@roots/bud-react]([[base]]/packages/@roots/bud-react) requires `@roots/bud-babel` to be installed as a peer dev dependency.

```sh
yarn add @roots/bud-babel --dev
```

You should also install `react` and `react-dom` explicitly:

```sh
yarn add react react-dom
```

## Installation

```sh
yarn add @roots/bud-react --dev
```

## Usage

Include `@roots/bud-react` in your config.

```js
module.exports = app =>
  app
    .use(['@roots/bud-babel', '@roots/bud-react'])
    .entry('app', ['app.css'])
```
