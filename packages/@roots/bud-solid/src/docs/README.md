## Installation

```sh
yarn add @roots/bud-solid --dev
```

Easiest way to keep everything in your project up-to-date is running `bud init` after installing any extension:

```sh
yarn bud init
```

## Usage

js/ts config:

```js
module.exports = app =>
  app.use([
    require('@roots/bud-babel'),
    require('@roots/bud-solid'),
  ])
```

json config:

```json
{
  "extensions": ["@roots/bud-babel", "@roots/bud-solid"]
}
```

yml config:

```yml
extensions:
  - '@roots/bud-babel'
  - '@roots/bud-solid'
```
