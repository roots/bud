<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-tailwindcss-theme-json</strong></h1>

<p align="center">
  Webpack plugin to help with wp_enqueue_script
</p>

---

## Installation

Install **@roots/bud-tailwindcss-theme-json** to your project.

Yarn:

```sh
yarn add @roots/bud-tailwindcss-theme-json --dev
```

npm:

```sh
npm install @roots/bud-tailwindcss-theme-json --save-dev
```

## Usage

### wpjson.useTailwindColors()

Convert `theme.colors` to a `theme.json` palette.

```ts title="bud.config.mjs"
bud.wpjson.useTailwindColors().enable();
```

### wpjson.useTailwindFontSize()

Emits values from `theme.fontSize` as the `typography.fontSizes` property of `theme.json`.

```ts title="bud.config.mjs"
bud.wpjson.useTailwindFontSize().enable();
```

### wpjson.useTailwindFontFamily()

Emits values from `theme.fontFamily` as the `typography.fontFamilies` property of `theme.json`.

```ts title="bud.config.mjs"
bud.wpjson.useTailwindFontFamily().enable();
```

### Limiting values to those defined in `theme.extend`

You can pass `true` to any of the the above functions to limit the values emitted to those defined under tailwind's `theme.extend` key.

```ts title="bud.config.mjs"
bud.wpjson.useTailwindColors(true).enable();
```

### In combination

You can use any of these methods in combination:

```ts title="bud.config.mjs"
bud.wpjson
  .useTailwindColors()
  .useTailwindFontSize()
  .useTailwindFontFamily()
  .enable();
```

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud-tailwindcss-theme-json is licensed under MIT.

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
