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

**@roots/bud-imagemin** works out of the box with no configuration. It uses the [sharp library](https://sharp.pixelplumbing.com/) to optimize images, and sticks to the default options provided by sharp.

This extension is a relatively thin wrapper around the [webpack-contrib/image-minimizer-webpack-plugin](https://github.com/webpack-contrib/image-minimizer-webpack-plugin). Refer to the [plugin documentation](https://github.com/webpack-contrib/image-minimizer-webpack-plugin) for more information on how to configure it.

## Manipulating images with URL parameters

### Convert to `webp`

You can convert an asset to `webp` format using the `?as=webp` url parameter.

It works in both styles and scripts:

```css title="app.css"
body {
  background-image: url(./images/image.jpg?as=webp);
}
```

```typescript title="app.js"
import image from "./images/image.jpg?as=webp";
```

### Adding additional presets

In addition to the preconfigured `?as=webp` parameter, you may define additional generators using **bud.imagemin.addPreset**.

For example, this custom generator will convert an asset to `png` at 80% quality when `?as=png` is appended to an image asset path.

```typescript title="bud.config.js"
export default async (bud) => {
  bud.imagemin.sharp.setGenerator(`png`, {
    options: {
      encodeOptions: {
        quality: 80,
      },
    },
  });
};
```

The preset label does not necessarily need to match one of the sharp encoder keys. For example, you might want to set up something a little more
persnickity like:

```typescript title="bud.config.js"
export default async (bud) => {
  bud.imagemin.addPreset(`webp@50`, {
    options: {
      encodeOptions: {
        webp: {
          quality: 50,
        },
      },
    },
  });
};
```

### Set dimensions

You can set an explicit width for an image with the `?width=n` url parameter. Likewise, you can set an explicit height with `?height=n`.

It works in both styles and scripts:

```css title="app.css"
body {
  background-image: url(./images/image.jpg?width=500&height=500);
}
```

```typescript title="app.js"
import image from "./images/image.jpg?width=500&height=500";
```

## Setting encoder options

You may wish to customize the encoder settings. This is done with **bud.imagemin.encode**.

```typescript title="bud.config.js"
export default async (bud) => {
  bud.imagemin.encode(`jpeg`, { quality: 50 });
  bud.imagemin.encode(`svg`, { multipass: false });
};
```

### Enable lossless compression

```typescript
export default async (bud) => {
  bud.imagemin.lossless();
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

**Bud** is an open source project and completely free to use.

However, the amount of effort needed to maintain and develop new features and projects within the Roots ecosystem is not sustainable without proper financial backing. If you have the capability, please consider [sponsoring Roots](https://github.com/sponsors/roots).

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
<a href="https://www.copiadigital.com/">
<img src="https://cdn.roots.io/app/uploads/copia-digital.svg" alt="Copia Digital" width="200" height="150"/>
</a>
<a href="https://www.freave.com/">
<img src="https://cdn.roots.io/app/uploads/freave.svg" alt="Freave" width="200" height="150"/>
</a>
