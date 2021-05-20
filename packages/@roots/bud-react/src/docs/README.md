## Requirements

`@roots/bud-react` requires `@roots/bud-babel` to be installed as a peer dev dependencies.

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

Include `@roots/bud-react` in your config. Make sure it is included after `@roots/bud-babel`.

```js
module.exports = app =>
  app
    .use([
      require('@roots/bud-babel'),
      require('@roots/bud-react'),
    ])
    .entry('app', ['app.css'])
```
