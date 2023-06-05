<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-minify</strong></h1>

<p align="center">
  CSS and JS minification for bud.js
</p>

---

## Installation

Install **@roots/bud-minify** to your project.

Yarn:

```sh
yarn add @roots/bud-minify --dev
```

npm:

```sh
npm install @roots/bud-minify --save-dev
```

## Options

## bud.minify.js

| Option            | type                                                | Default     |
| :---------------- | :-------------------------------------------------- | :---------- |
| `minify`          | `TerserPlugin.MinimizerImplementation`              | `terser`    |
| `include`         | `TerserPlugin.BasePluginOptions['include']`         | `undefined` |
| `exclude`         | `TerserPlugin.BasePluginOptions['exclude']`         | `undefined` |
| `extractComments` | `TerserPlugin.BasePluginOptions['extractComments']` | `false`     |
| `parallel`        | `TerserPlugin.BasePluginOptions['parallel']`        | `true`      |
| `terserOptions`   | `TerserPlugin.TerserOptions`                        | `[object]`  |

- When [@roots/bud-swc](https://bud.js.org/extensions/bud-swc) is installed the swc minifier function will be used.
- When [@roots/bud-esbuild](https://bud.js.org/extensions/bud-esbuild) is installed the esbuild minifier function will be used.

## bud.minify.css

| Option             | type                                                       | Default        |
| :----------------- | :--------------------------------------------------------- | :------------- |
| `minify`           | `CSSMinimizerPlugin.MinimizerImplementation`               | `lightningcss` |
| `test`             | `CSSMinimizerPlugin.BasePluginOptions['test']`             | `undefined`    |
| `include`          | `CSSMinimizerPlugin.BasePluginOptions['include']`          | `undefined`    |
| `exclude`          | `CSSMinimizerPlugin.BasePluginOptions['exclude']`          | `undefined`    |
| `parallel`         | `CSSMinimizerPlugin.BasePluginOptions['parallel']`         | `true`         |
| `minimizerOptions` | `CSSMinimizerPlugin.BasePluginOptions['minimizerOptions']` | `[object]`     |

- When [@roots/bud-swc](https://bud.js.org/extensions/bud-swc) is installed swc is used to minify css.
- When [@roots/bud-esbuild](https://bud.js.org/extensions/bud-esbuild) is installed esbuild is used to minify css.

## bud.minify.js

### bud.minify.js.getInclude

Get the value of `include`

```ts
bud.minify.js.getInclude();
```

Set the value of `include`

```ts
bud.minify.js.setInclude(/.*/);
```

### bud.minify.js.exclude

Get the value of `exclude`

```ts
bud.minify.js.getExclude();
```

Set the value of `exclude`

```ts
bud.minify.js.setExclude(/.*/);
```

### bud.minify.js.minify

Get the value of `minify`.

```ts
bud.minify.js.getMinify();
```

Set the value of `minify`. Since the value is a function you must wrap it in a callback.

```ts
const dubiousMinifier = async (input: unknown) => ({
  code: Object.values(input).join(`\n`).replace(/\/\//g, `// 💸`),
});

bud.minify.js.setMinify(() => dubiousMinifier);
```

### bud.minify.js.parallel

Get the value of `parallel`.

```ts
bud.minify.js.getParallel();
```

Set the value of `parallel`.

```ts
bud.minify.js.setParallel(true);
```

### bud.minify.js.extractComments

Get the value of `extractComments`.

```ts
bud.minify.js.getExtractComments();
```

Set the value of `extractComments`.

```ts
bud.minify.js.setExtractComments(true);
```

### bud.minify.js.terserOptions

Get the value of `terserOptions`.

```ts
bud.minify.js.getTerserOptions();
```

Set the value of `terserOptions`.

```ts
bud.minify.js.setTerserOptions((options) => ({
  ...options,
  mangle: false,
}));
```

### bud.minify.js.dropComments

Remove comments from output:

```typescript
export default async (bud) => {
  bud.minify.js.dropComments();
};
```

### bud.minify.js.dropConsole

Remove `console.*` statements from output.

```typescript
export default async (bud) => {
  bud.minify.js.dropConsole();
};
```

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud-minify is licensed under MIT.

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
