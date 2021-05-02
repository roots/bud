## Overview

> Adds @tailwindlabs/tailwindcss support to `@roots/bud` projects.

## toc

## Requirements

If you haven't already installed `@roots/bud-postcss` you'll need to do that first.

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

Again, take note that `@roots/bud-postcss` is required to utilize `@roots/bud-tailwindcss`.

You should now be good to utilize tailwind in your `@roots/bud-tailwindcss` project. You may use it with scss or postcss.

If you need a tailwindcss config file to get started with you may also pull one into your project with the [`bud publish` command](docs:cli).

```sh
yarn bud publish @roots/bud-tailwindcss tailwind.config.js
```

## Configuration

You may use the `bud.tailwind` function to apply further customizations to your project. This is totally optional.

```js
bud.tailwind(config, implementation)
```

### Parameters

#### tailwindConfig

Specify a custom path to your tailwind config:

```js
bud.tailwind(budpath('project', 'path/to/config.js'))
```

You can also provide your tailwind config as an object, should you prefer.

```js
bud.tailwind({
  theme: ({theme}) => ({
    colors: {},
  }),
})
```

#### implementation

Additionally, you may use the second parameter to specify if you prefer to use `tailwindcss` or `@tailwindcss/jit` (in case you have both installed in your modules directory):

```js
bud.tailwind(
  config,
  '@tailwindcss/jit',
)
```
