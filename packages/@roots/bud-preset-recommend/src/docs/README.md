## Overview

Includes support for:
  - postcss (with postcss-preset-env) 
  - babel
  - entrypoints.json (for easier enqueues when not [generating html with bud](docs:config/template))
  - code automatically minified in production

## Requirements

If you haven't already, you will need to install `@roots/bud`. It is likely that you want `@roots/bud-cli` tools as well.

```sh
yarn add @roots/bud @roots/bud-cli --dev
```

## Installation

```sh
yarn add @roots/bud-preset-recommended --dev
```

The preset requires `postcss` to be installed in your project. You can install it automatically using `@roots/bud-cli`.

```sh
yarn bud extensions:install
```

You may need to restart the build after installation. But, hopefully not 🤞.

## Usage

`bud.config.yml`:

```yml
extensions:
  - '@roots/bud-preset-recommend'
```

`bud.config.json`:

```json
{
  "extensions": [
    "@roots/bud-preset-recommend"
  ]
}
```

`bud.config.js`:

```js
app.use(require('@roots/bud-preset-recommend'))
```

If you're unsure what to do from here, consult the [getting started guide](docs:getting-started).