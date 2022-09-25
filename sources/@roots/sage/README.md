<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/sage</strong></h1>

<p align="center">
  @roots/sage preset for @roots/bud
</p>

---

## Installation

Install **@roots/sage** to your project.

Yarn:

```sh
yarn add @roots/sage --dev
```

npm:

```sh
npm install @roots/sage --save-dev
```

## Usage

Documentation for this package is available on [bud.js.org](https://bud.js.org/extensions/sage). It may include additional context and information not available in this README.

### Included Extensions

The @roots/sage extension depends on [@roots/bud-preset-wordpress](https://bud.js.org/extensions/bud-preset-wordpress) which in turn depends on [@roots/bud-preset-recommend](https://bud.js.org/extensions/bud-preset-recommend).

All told, these are the extensions which are installed as peers of @roots/sage:

| Extension                                                               | Description                                                    |
| ----------------------------------------------------------------------- | -------------------------------------------------------------- |
| [@roots/bud-babel](https://bud.js.org/extensions/bud-babel)             | Babel transpiler                                               |
| [@roots/bud-entrypoints](https://bud.js.org/extensions/bud-entrypoints) | Emits `entrypoints.json` manifest                              |
| [@roots/bud-postcss](https://bud.js.org/extensions/bud-postcss)         | PostCSS transpiler                                             |
| [@roots/bud-react](https://bud.js.org/extensions/bud-react)             | React support                                                  |
| @roots/bud-wordpress-dependencies                                       | emits `wordpress.json` manifest                                |
| @roots/bud-wordpress-externals                                          | Externalizes references to code provided by `window.wp`        |
| @roots/bud-wordpress-manifests                                          | Combines the `entrypoints.json` and `wordpress.json` manifests |

### Using With Eslint

Install the [@roots/bud-eslint](https://bud.js.org/extensions/bud-eslint) and the [@roots/eslint-config] preset package:

```sh npm2yarn
yarn add @roots/bud-eslint @roots/eslint-config --dev
```

Then, in your theme directory create a `eslint.config.cjs` file and include the Sage default eslint config:

```ts title="eslint.config.cjs"
module.exports = {
  root: true,
  extends: ["@roots/eslint-config/sage"],
};
```

### Using With Stylelint

Install the [@roots/bud-stylelint extension](https://bud.js.org/extensions/bud-stylelint):

```sh npm2yarn
yarn add @roots/bud-stylelint --dev
```

Next, in your theme directory create a `.stylelintrc.js` file and include the Sage default stylelint config:

```ts title="bud.config.mjs"
module.exports = {
  extends: ["@roots/sage/stylelint-config"],
  rules: {
    "color-no-invalid-hex": true,
  },
};
```

### Managing Theme Json

You can manage [WordPress' `theme.json` config file](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/) from the context of your bud config using `bud.wptheme`.

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

#### wpjson.useTailwindColors

Convert `theme.extends.colors` to a `theme.json` palette.

```ts title="bud.config.mjs"
bud.wpjson.useTailwindColors().enable();
```

#### wpjson.useTailwindFontSize()

Emits values from `theme.extends.fontSize` as the `typography.fontSizes` property of `theme.json`.

```ts title="bud.config.mjs"
bud.wpjson.useTailwindFontSize().enable();
```

#### wpjson.useTailwindFontFamily()

Emits values from `theme.extends.fontFamily` as the `typography.fontFamilies` property of `theme.json`.

```ts title="bud.config.mjs"
bud.wpjson.useTailwindFontFamily().enable();
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

### Using With Sass

Install the [@roots/bud-sass extension](https://bud.js.org/extensions/bud-sass):

```sh npm2yarn
yarn add @roots/bud-sass --dev
```

If using stylelint you will need to configure it for sass:

```ts file="stylelint.config.cjs"
module.exports = {
  extends: ["@roots/sage/stylelint-config", "@roots/bud-sass/stylelint-config"],
};
```

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/sage is licensed under MIT.

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
