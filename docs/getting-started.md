# Getting Started

> In this guide we'll look at a hypothetical project and walk through the basics of how it works.

Let's take as an example this simple project structure:

```sh
project-dir
├── dist
├── package.json
└── src
    ├── scripts
    └── styles
```

There are [a number of ways to configure bud](docs/config/README). For this guide, we'll utilize a JS file.

Our minimal `bud.config.js` file might look something like this:

```js
module.exports = (bud) =>
  bud.entry({
    app: ["scripts/app.js", "styles/app.css"],
  });
```

[bud.entry](https://github.com/roots/bud/tree/stable/docs/config/entry.md) is used to concatenate your source assets
into distinct distributable entrypoints. It takes two arguments, indicating:

1.  the entrypoint name; and
2.  the source files to include.

To run this build we can use the CLI ([documentation](https://github.com/roots/bud/tree/stable/docs/cli.md)).

```sh
yarn bud build
```

## Adding Babel

As a next step, let's presume we want to add [**@babel/babel**](https://github.com/babel/babel) to our project.

Babel support is optional and is provided by the [**@roots/bud-babel**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-babel) extension, so we will first need to install it.

```sh
yarn add @roots/bud-babel --dev
```

And then add the extension to our config.

```js
const babel = require("@roots/bud-babel");

module.exports = (bud) =>
  bud.use(babel).entry({
    app: ["scripts/app.js", "styles/app.css"],
  });
```

We can verify the extension is being picked up using the `bud extensions:list` terminal command

```sh
yarn bud extensions:list
```

Which should show:

```sh
Installed
---
- @roots/bud
- @roots/bud-babel
- @roots/bud-cli
```

If the extension registers any further dependencies, we can also run `bud extensions:install` to install them. In this case, [**@roots/bud-babel**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-babel) does not register any additional dependencies.

## Running the build

WIth our config file in place and [**@roots/bud-babel**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-babel) installed, we can run our build:

```sh
yarn bud build
```

## Splitting and minifying code

As our application grows in scale we'll probably want to put in some work to keep our bundled code lean and optimize how it loaded.

We can use [`bud.minimize`](docs`config/minimize.md`) and [`bud.splitChunks`](docs`config/splitChunks.md`) to handle these two needs.

```js
bud
  .use(babel)
  .entry({
    app: ["scripts/app.js", "styles/app.css"],
  })
  .minimize()
  .splitChunks();
```

One negative effect of this improvement is that we are applying these optimizations when running the build in development. There is probably no need for this at all.

It would be ideal to instead only apply optimizations like these for production builds. The [bud.when](docs`config/when.md`) utility function is well suited for this.

```js
bud
  .use(babel)
  .entry({
    app: ["scripts/app.js", "styles/app.css"],
  })
  .when(bud.isProduction, () => bud.minimize().splitChunks());
```

You could do the same thing but specifically targeting dev builds by pairing [bud.when](docs`config/when.md`) with `bud.isDevelopment`.

These expressions are roughly equivalent to

```ts
if (bud.mode === "development") {
  // ...
}
```

In the end, they are arguably just a little more natural to read and write, since we don't need to break our chain of functions to use them.

## Including static assets

If you have images to include in the bundle, but aren't importing them directly into a JS file (very common with projects that utilize a server-side framework like [**@wordpress/wordpress**](https://github.com/wordpress/wordpress) or [**@laravel/laravel**](https://github.com/laravel/laravel)), you can utilize [`bud.assets`](https://github.com/roots/bud/tree/stable/docs/config/assets.md) to process them.

```js
bud
  .use(babel)
  .entry({
    app: ["scripts/app.js", "styles/app.css"],
  })
  .when(bud.isProduction, () => bud.minimize().splitChunks())
  .assets(["images/picture.png"]);
```
