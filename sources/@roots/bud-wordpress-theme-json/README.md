<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-wordpress-theme-json</strong></h1>

<p align="center">
  Webpack plugin to help with wp_enqueue_script
</p>

---

## Installation

Install **@roots/bud-wordpress-theme-json** to your project.

Yarn:

```sh
yarn add @roots/bud-wordpress-theme-json --dev
```

npm:

```sh
npm install @roots/bud-wordpress-theme-json --save-dev
```

## Usage

You can manage [WordPress' `theme.json` config file](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/) from the context of your bud config using **bud.wptheme**.

### Enabling `theme.json` support

In order to emit the file you will need to enable the feature:

```ts title="bud.config.mjs"
bud.wpjson.enable();
```

### Managing generic `theme.json` values

You can use `setOption` from the bud.js extensions API to set `theme.json` values:

```ts title="bud.config.mjs"
bud.wpjson.setOption("customTemplates", []).enable();
```

### Managing the `settings` field

Most `theme.json` configuration centers around the `settings` property. You can modify these values using a fluent
container interface exposed by `bud.wpjson.settings`.

```ts title="bud.config.mjs"
bud.wptheme
  .settings((theme) =>
    theme
      .set("typography.customFontSizes", true)
      .set("typography.fontWeight", false)
      .merge("spacing.units", ["px", "%", "em"])
  )
  .enable();
```

### Using tailwindcss config values

If you use [@roots/bud-tailwindcss](https://bud.js.org/extensions/bud-tailwindcss) in your project there are several
opt-in config functions that allow you to generate `theme.json` values directly from your tailwind config.

#### wpjson.useTailwindColors()

Convert `theme.colors` to a `theme.json` palette.

```ts title="bud.config.mjs"
bud.wpjson.useTailwindColors().enable();
```

#### wpjson.useTailwindFontSize()

Emits values from `theme.fontSize` as the `typography.fontSizes` property of `theme.json`.

```ts title="bud.config.mjs"
bud.wpjson.useTailwindFontSize().enable();
```

#### wpjson.useTailwindFontFamily()

Emits values from `theme.fontFamily` as the `typography.fontFamilies` property of `theme.json`.

```ts title="bud.config.mjs"
bud.wpjson.useTailwindFontFamily().enable();
```

#### Limiting values to those defined in `theme.extend`

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
  .setOption("typography.fontWeight", false)
  .enable();
```

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud-wordpress-theme-json is licensed under MIT.

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
