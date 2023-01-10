<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-imagemin</strong></h1>

<p align="center">
  Image minimizer for bud.js
</p>

---

## Installation

Install **@roots/bud-imagemin** to your project.

Yarn:

```sh
yarn add @roots/bud-imagemin --dev
```

npm:

```sh
npm install @roots/bud-imagemin --save-dev
```

## Usage

**@roots/bud-imagemin** works out of the box with no configuration. It uses the [squoosh](https://squoosh.app/) library to optimize images, and sticks to the default options provided by the library.

Ultimately, this extension is a relatively thin wrapper around the [webpack-contrib/image-minimizer-webpack-plugin](https://github.com/webpack-contrib/image-minimizer-webpack-plugin). Refer to the [plugin documentation](https://github.com/webpack-contrib/image-minimizer-webpack-plugin) for a better understanding of how it all works.

### Functions

- [bud.imagemin.encode](https://bud.js.org/extensions/bud-imagemin/encode)
- [bud.imagemin.configure](https://bud.js.org/extensions/bud-imagemin/configure)

## Convering asets to webp

You may convert an asset to `webp` format using the `?as=webp` url parameter.

It works in both styles and scripts:

```css title="app.css"
body {
  background-image: url(./images/image.jpg?as=webp);
}
```

```typescript title="app.js"
import image from "./images/image.jpg?as=webp";
```

You're able [to add additional generators](#generators) if you want to do the same thing with another filetype.

## Setting encoder options

You may wish to customize the encoder settings. This is done with [bud.imagemin.encode](https://bud.js.org/extensions/bud-imagemin/encode).

```typescript title="bud.config.mjs"
export default async (bud) => {
  bud.imagemin.encode(`jpg`, { quality: 50 });
};
```

Some of the default squoosh encoders have a name that does not match the filetype. For example, the `mozjpeg` encoder is used to encode `jpg` files.

When setting the encoder options the function will automatically map filetypes to the encoder name for you.

### Mapping new encoders

If you are adding [support for a new minimizer](#minimizers), you may want to add to the encoder map or modify existing map entries.

You can do that with the **bud.imagemin.encoders** map object:

```typescript title="bud.config.mjs"
export default async (bud) => {
  bud.imagemin.encoders.set(`png`, [`squoosh`, `oxipng`]);
};
```

This allows [bud.imagemin.encode](https://bud.js.org/extensions/bud-imagemin/encode) to work with the new minimizer.

## Generators

Generators allow you to convert one type of image asset to another by appending a URL parameter to the asset path.

With the default configuration, you [can convert an image to `webp` using the `?as=webp` url parameter](#using-the-webp-preset).

### Adding generators

You may add additional generators using `bud.imagemin.setGenerator`.

For example, this custom generator will convert an asset to `png` at 80% quality when `?as=png` is appended to an image asset path.

```typescript title="bud.config.mjs"
export default async (bud) => {
  const options = { oxipng: { quality: 80 } };
  bud.imagemin.setGenerator(`png`, options);
};
```

Once set, it can be called using `?as=png` from application scripts and styles.

```css title="app.css"
.selector {
  background-image: url(./images/image.jpg?as=png);
}
```

### Operating on generators directly

You may access the generator map directly using **bud.imagemin.generators**.

```typescript title="bud.config.mjs"
export default async (bud) => {
  bud.imagemin.generators.clear();
};
```

## Minimizers

### Modifying minimizers

Use [bud.imagemin.configure](https://bud.js.org/extensions/bud-imagemin/configure) to customize minimizer options.

### Adding minimizers

You can add support for other minimizers beyond the included default using **bud.imagemin.setMinimizer**.

```typescript title="bud.config.mjs"
import MinimizerFunction from "minimizer-lib";

export default async (bud) => {
  bud.imagemin.setMinimizer(`minimizer-lib`, {
    minimizer: {
      implementation: MinimizerFunction,
      options: {
        encodeOptions: bud.imagemin.encoders,
      },
    },
  });
};
```

### Operating on minimizers directly

You may access the minimizer map directly using **bud.imagemin.minimizers**.

```typescript title="bud.config.mjs"
export default async (bud) => {
  bud.imagemin.minimizers.clear();
};
```

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud-imagemin is licensed under MIT.

## Community

Keep track of development and community news.

- Join us on Roots Slack by becoming a [GitHub
  sponsor](https://github.com/sponsors/roots)
- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)

## Sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

<a href="https://k-m.com/">
<img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150"/>
</a>
<a href="https://carrot.com/">
<img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="200" height="150"/>
</a>
<a href="https://wordpress.com/">
<img src="https://cdn.roots.io/app/uploads/wordpress.svg" alt="WordPress.com" width="200" height="150"/>
</a>
<a href="https://pantheon.io/">
<img src="https://cdn.roots.io/app/uploads/pantheon.svg" alt="Pantheon" width="200" height="150"/>
</a>
<a href="https://worksitesafety.ca/careers/">
<img src="https://cdn.roots.io/app/uploads/worksite-safety.svg" alt="Worksite Safety" width="200" height="150"/>
</a>
