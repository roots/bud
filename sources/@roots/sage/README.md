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

## Included extensions

The @roots/sage extension depends on [@roots/bud-preset-wordpress](https://bud.js.org/extensions/bud-preset-wordpress) which in turn depends on [@roots/bud-preset-recommend](https://bud.js.org/extensions/bud-preset-recommend).

These are the packages which are installed as peers and registered by the **@roots/sage** main extension:

| Extension                                                                         | Description        |
| --------------------------------------------------------------------------------- | ------------------ |
| [@roots/bud-babel](https://bud.js.org/extensions/bud-babel)                       | Babel transpiler   |
| [@roots/bud-postcss](https://bud.js.org/extensions/bud-postcss)                   | PostCSS transpiler |
| [@roots/bud-react](https://bud.js.org/extensions/bud-react)                       | React support      |
| [@roots/bud-preset-wordpress](https://bud.js.org/extensions/bud-preset-wordpress) | WordPress preset   |

## Using with eslint

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

## Using with stylelint

Install the [@roots/bud-stylelint extension](https://bud.js.org/extensions/bud-stylelint):

```sh npm2yarn
yarn add @roots/bud-stylelint --dev
```

Next, in your theme directory create a `.stylelintrc.js` file and include the Sage default stylelint config:

```ts title="bud.config.mjs"
module.exports = {
  extends: ["@roots/sage/stylelint", "@roots/bud-tailwindcss/stylelint"],
  rules: {
    "color-no-invalid-hex": true,
  },
};
```

If you aren't using `@roots/bud-tailwindcss` you may remove the `@roots/bud-tailwindcss/stylelint` value from `extends`.

## Using with sass

Install the [@roots/bud-sass extension](https://bud.js.org/extensions/bud-sass):

```sh npm2yarn
yarn add @roots/bud-sass --dev
```

If using stylelint you will need to configure it for sass:

```ts file="stylelint.config.cjs"
module.exports = {
  extends: [
    "@roots/sage/stylelint-config",
    "@roots/bud-sass/stylelint-config",
    "@roots/bud-tailwindcss/stylelint-config",
  ],
};
```

## Handling blade `@asset` directives

It is probable that you have assets which are only referenced in the context of blade template files. However, by default **bud.js** ignores the Sage views directory. This means that **bud.js** will not build assets which are used only in blade template files.

The standard way of handling this predicament has been by calling [bud.assets](https://bud.js.org/docs/bud.copy) on the `resources/images` directory, which informs the compiler that it should include those files in the compilation.

However, as an alternative, you can opt-in to the processing of blade templates using **bud.sage.copyBladeAssets**. Once enabled, files referenced in blade templates using the `@assets` directive will be extracted and included in the compilation without the need for copying them.

```typescript file=bud.config.js
export default async (bud) => {
  bud.sage.copyBladeAssets();
};
```

The possible downside of this approach is that it may be slower than simply copying the directory contents, especially if you have a large number of blade partials. Conversely, if you had a very large number of images in your assets directory it could significantly reduce build times. It is very project dependent and thus opt-in.

That said, compilation speed isn't the full story, and the results of this process are cached so subsequent builds and dev server builds are not really effected much either way. There are other reasons you may want to consider processing blade partials as part of your build step -- namely image optimization.

With [@roots/bud-imagemin](https://bud.js.org/extensions/bud-imagemin) installed enabling this feature allows you to manipulate images using URL query parameters:

```php
<div class=foo>
  <img src=@asset('images/example.png?as=webp&width=200&height=200') alt="Example image" />
</div>
```

This may very well turn out to be worth trading a few extra seconds for!

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
<a href="https://worksitesafety.ca/careers/">
<img src="https://cdn.roots.io/app/uploads/worksite-safety.svg" alt="Worksite Safety" width="200" height="150"/>
</a>
