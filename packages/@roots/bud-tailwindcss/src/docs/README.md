## Overview

> Adds tailwindcss support to [@roots/bud](https://github.com/roots/bud/tree/stable/README.md) projects.

- [Requirements](#Requirements)
- [Installation](#Installation)
- [Usage](#usage)
- [Configuration](#configuration)
  - [Parameters](#parameters)
  - [config](#config)
  - [implementation](#implementation)

## Requirements

If you haven't already [installed @roots/bud-postcss]([[base]]/packages/@roots/bud-postcss/README.md) you'll need to do that first.

```sh
yarn add @roots/bud-postcss postcss --dev
```

## Installation

Install your choice of `tailwindcss` or `@tailwindcss/jit` to your project.

```sh
yarn add @roots/bud-tailwindcss @tailwindcss/jit --dev
```

## Usage

Add the extension to your config:

```js
bud.use(['@roots/bud-postcss', '@roots/bud-tailwindcss'])
```

Again, take note that [@roots/bud-postcss]([[base]]/packages/@roots/bud-postcss/README.md) is required to utilize [@roots/bud-tailwindcss]([[base]]/packages/@roots/bud-tailwindcss/README.md).

You should now be good to utilize tailwind in your [@roots/bud](https://github.com/roots/bud/tree/stable/README.md) project. You may use it with scss or postcss.

If you need a tailwindcss config file to get started with you may also pull one into your project with the `bud publish` command:

```sh
yarn bud publish @roots/bud-tailwindcss tailwind.config.js
```

## Configuration

You may use the `bud.tailwind` function to apply further customizations to your project. This is totally optional.

```js
bud.tailwind(config, implementation)
```

### Parameters

- [**config**](#config): a path to your config file, or a config object.
- [**implementation**](#implementation): either `'tailwindcss'` or `'@tailwindcss/jit'`

#### config

Specify a custom path to your tailwind config:

```js
bud.tailwind(budpath('project', 'path/to/config.js'))
```

You can also provide your tailwind config as an object, should you prefer.

```js
bud.tailwind({
  theme: ({theme}) => ({
    colors: {},
    // ...
  }),
})
```

#### implementation

Additionally, you may use the second parameter to specify if you prefer to use `tailwindcss` or `@tailwindcss/jit` (in case you have both installed in your modules directory):

```js
bud.tailwind(
  config,
  '@tailwindcss/jit', // or 'tailwindcss',
)
```
