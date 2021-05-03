# Getting Started

> In this guide we'll look at a hypothetical project and walk through the basics of how it works.

Let's take as an example this simple project structure:

```sh
project-dir
├── bud.config.js
├── dist
├── package.json
└── src
    ├── scripts
    └── styles
```

Our minimal `bud.config.js` file might look something like this:

```js
module.exports = bud =>
  bud.entry({
    app: ['scripts/app.js', 'styles/app.css'],
  })
```

[bud.entry](docs`config/entry.md`) is used to concatenate your source assets
into distinct distributable entrypoints. It takes two arguments, indicating:

1. the entrypoint name; and
2. the source files to include.

To run this build we can use the bud CLI.

```sh
yarn bud build
```

## Adding Babel

As a next step, let's presume we want to add Babel to our project.

Babel support is optional and is provided by the `@roots/bud-babel` extension, so we will first need to install it.

```sh
yarn add @roots/bud-babel --dev
```

And then add the extension to our config.

```js
const babel = require('@roots/bud-babel')

module.exports = bud =>
  bud.use(babel).entry({
    app: ['scripts/app.js', 'styles/app.css'],
  })
```

## Splitting and minifying code

As our application grows in scale we'll probably want to put in some work to keep our bundled code lean and optimize how it loaded.

We can use [`bud.minimize`](docs`config/minimize.md`) and [`bud.splitChunks`](docs`config/splitChunks.md`) to handle these two needs.

```js
bud
  .use(babel)
  .entry({
    app: ['scripts/app.js', 'styles/app.css'],
  })
  .minimize()
  .splitChunks()
```

One negative effect of this improvement is that we are applying these optimizations when running the build in development. There is probably no need for this at all.

It would be ideal to instead only apply optimizations like these for production builds. The [bud.when](docs`config/when.md`) utility function is well suited for this.

```js
bud
  .use(babel)
  .entry({
    app: ['scripts/app.js', 'styles/app.css'],
  })
  .when(bud.isProduction, () => bud.minimize().splitChunks())
```

You could do the same thing but specifically targeting dev builds by pairing [bud.when](docs`config/when.md`) with `bud.isDevelopment`.

These expressions are roughly equivalent to

```ts
if (bud.mode === 'development') {
  // ...
}
```

In the end, they are arguably just a little more natural to read and write, since we don't need to break our chain of functions to use them.

## Including static assets

If we have some images we would like to include in our bundle, but we aren't going to import them directly into a JS file (very common with projects that utilize a server-side framework like WordPress or Laravel), we can use [`bud.assets`](docs`config/assets.md`) to move them from our `src` dir to `dist`.

```js
bud
  .use(babel)
  .entry({
    app: ['scripts/app.js', 'styles/app.css'],
  })
  .when(bud.isProduction, () => bud.minimize().splitChunks())
  .assets(['images/picture.png'])
```
