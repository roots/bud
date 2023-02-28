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

You can add blade template files to entrypoints as if they were javascript modules.

```js
export default async (bud) => {
  bud.entry({
    app: ["@scripts/app", "@styles/app"],
    editor: ["@scripts/editor", "@styles/editor"],
    index: ["@views/index"],
  });
};
```

Any modules referenced with the `@asset` directive will be included in the compilation.

If you wanted to include _all_ blade templates, you could do so with `bud.glob`.

```js
export default async (bud) => {
  bud.entry({
    app: [
      "@scripts/app",
      "@styles/app",
      ...(await bud.glob(`@views/**/*.blade.php`)),
    ],
    editor: ["@scripts/editor", "@styles/editor"],
  });
};
```

## Adding scripts and styles to blade templates

You may include client scripts and styles directly in blade templates using directives. This is different than other community packages because the code is extracted and ran through the compiler This means you can write postcss, sass, typescript, etc.

```js
@extends('layouts.app')

@section('content')
  <img src=@asset('images/404.png?as=webp') />
  <img src=@asset('images/404.png?as=webp&width=200') />
  <div id="target-el"></div>
@endsection

@js
import {render} from '@scripts/render'

ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('target-el')
);
@endjs

@css
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';

body {
  @apply bg-blue-500;
}
@endcss
```

Current supported extensions: `js`, `ts`, `css`, `scss`, `vue`.

Note that in order to use `ts`, `scss` or `vue` you will need to have installed a bud extension that supports that language or framework.

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
