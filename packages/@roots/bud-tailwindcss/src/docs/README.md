## Requirements

If you haven't already installed `@roots/bud-postcss` you'll need to do that first.

```sh
yarn add @roots/bud-postcss --dev
```

## Installation

```sh
yarn add @roots/bud-tailwindcss
```

After installation run the following command to download any peer dependencies

```sh
yarn bud init
```

## Usage

Add the extension to your config:

```js
bud.use(['@roots/bud-postcss', '@roots/bud-tailwindcss'])
```

Again, take note that `@roots/bud-postcss` is required to utilize `@roots/bud-tailwindcss`.

You should now be good to utilize tailwind in your `@roots/bud-tailwindcss` project.

## Configuration

You may use the `bud.tailwind` function to apply further customizations to your project. This is totally optional.

```js
bud.tailwind(config)
```

The config parameter is passed through to tailwindcss so reference their docs for more information on how it can be used.
