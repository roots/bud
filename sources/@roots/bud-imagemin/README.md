<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-imagemin</strong></h1>

<p align="center">
  Image minification for &#x60;@roots/bud&#x60; projects
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

### Configuration

### Encoder

You can set options for an encoder with `bud.imagemin.encode`:

```ts
export default async (bud) => {
  bud.imagemin
    /**
     * Set encoder options:
     * - 'jpg' will be interpolated to 'mozjpeg'
     * - 'png' will be interpolated to 'oxipng'
     */
    .encode("jpg", { quality: 50 })
    .encode("png", { quality: 90 });
};
```

Available encoders:

| encoder | extension |
| ------- | --------- |
| mozjpeg | `.jpg`    |
| webp    | `.webp`   |
| avif    | `.avif`   |
| jxl     | `.jxl`    |
| wp2     | `.wp2`    |
| oxipng  | `.png`    |

### setEncodeOptions

You can fully override the encoder config using `bud.imagemin.setEncodeOptions`.

Options are expressed as a `Map`:

```ts
const options = new Map([
  ["mozjpeg", { quality: 50 }],
  ["oxipng", "auto"],
  ["webp", {}],
]);

export default async (bud) => {
  bud.imagemin.setEncodeOptions(options);
};
```

## Implementation

You can replace `libSquoosh` with another implementation using `bud.imagemin.setEncoder`:

```ts
export default async (bud) => {
  bud.imagemin.setEncoder(SomeEncoder);
};
```

## Generator

You can replace the `libSquoosh` generator with another implementation using `imagemin.setGenerator`:

```ts
export default async (bud) => {
  bud.imagemin.setGenerator(SomeGenerator);
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
