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

```shell
yarn add @roots/sage --dev
```

## Usage

### Eslint

Install the [`@roots/bud-eslint` extension](/extensions/bud-eslint):

```sh npm2yarn
yarn add @roots/bud-eslint --dev
```

Next, in your theme directory create a `eslint.config.js` file and include the Sage default eslint config:

```ts
module.exports = {
  root: true,
  extends: ["@roots/eslint-config/sage"],
};
```

### Stylelint

Install the [`@roots/bud-stylelint` extension](/extensions/bud-sass):

```sh npm2yarn
yarn add @roots/bud-stylelint --dev
```

Next, in your theme directory create a `.stylelintrc.js` file and include the Sage default stylelint config:

```ts
module.exports = {
  extends: ["@roots/sage/stylelint-config"],
  rules: {
    "color-no-invalid-hex": true,
  },
};
```

### Tailwind

If generating `theme.json` with the `themeJson` function, you can define the `theme.json` `color.palette` option from values found in `tailwind.config.js`.

```ts title="bud.config.js"
app.wpjson.useTailwindColors().enable();
```

This only works with colors defined under the `theme.extend.colors` key in `tailwind.config.js`:

```ts title="tailwind.config.js"
module.exports = {
  content: ["./app/**/*.php", "./resources/**/*.{php,vue,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#525ddc",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
```

### Theme Json

You can generate a `theme.json` during build using the `themeJson` function provided by Sage.

Shown with defaults:

```ts title="bud.config.js"
app.themeJson({
  color: {
    custom: false,
    customGradient: false,
  },
  custom: {
    spacing: {},
    typography: { "font-size": {}, "line-height": {} },
  },
  spacing: {
    padding: true,
    units: ["px", "%", "em", "rem", "vw", "vh"],
  },
  typography: {
    customFontSize: false,
    dropCap: false,
  },
});
```

If you just want to modify the defaults rather than provide your own entirely, you can do so with a function.

By default, the callback will supply you with a container of the default `theme.json` values:

```ts title="bud.config.js"
app.themeJson((theme) => {
  theme.set("typography.customFontSize", true);
  return theme;
});
```

If preferred, you can request a normal object by passing `true` as an optional second parameter:

```ts title="bud.config.js"
app.themeJson(
  (theme) => ({
    ...theme,
    typography: {
      ...theme.typography,
      customFontSize: true,
    },
  }),
  true
);
```

### With Sass

Install the [`@roots/bud-sass` extension](/extensions/bud-sass):

```sh npm2yarn
yarn add @roots/bud-sass --dev
```

If using stylelint you will need to configure it for sass:

```ts
module.exports = {
  extends: ["@roots/sage/stylelint-config", "@roots/bud-sass/stylelint-config"],
  rules: {
    "color-no-invalid-hex": true,
  },
};
```

## Contributing

Contributions are welcome from everyone.

We have [contribution
guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md)
to help you get started.

## Licensing

Bud is licensed MIT.

## Community

Keep track of development and community news.

- Join us on Roots Slack by becoming a [GitHub
  sponsor](https://github.com/sponsors/roots)
- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)

## Sponsors

Help support our open-source development efforts by [becoming a
patron](https://www.patreon.com/rootsdev).

<a href="https://k-m.com/">
<img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150"/>
</a>
<a href="https://carrot.com/">
<img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="200" height="150"/>
</a>
<a href="https://www.c21redwood.com/">
<img src="https://cdn.roots.io/app/uploads/c21redwood.svg" alt="C21 Redwood Realty" width="200" height="150"/>
</a>
<a href="https://wordpress.com/">
<img src="https://cdn.roots.io/app/uploads/wordpress.svg" alt="WordPress.com" width="200" height="150"/>
</a>
<a href="https://pantheon.io/">
<img src="https://cdn.roots.io/app/uploads/pantheon.svg" alt="Pantheon" width="200" height="150"/>
</a>
