<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-terser</strong></h1>

<p align="center">
  Adds terser support to Bud
</p>

---

## Installation

Install **@roots/bud-terser** to your project.

Yarn:

```sh
yarn add @roots/bud-terser --dev
```

npm:

```sh
npm install @roots/bud-terser --save-dev
```

The **@roots/bud-terser** extension is pre-installed and enabled by default for production builds.

## Options

| Option            | type                                                         | Default                            |
| :---------------- | :----------------------------------------------------------- | :--------------------------------- |
| `minify`          | `TerserWebpackPlugin.MinimizerImplementation<TerserOptions>` | `TerserWebpackPlugin.terserMinify` |
| `include`         | `TerserWebpackPlugin.BasePluginOptions['include']`           | `undefined`                        |
| `exclude`         | `TerserWebpackPlugin.BasePluginOptions['exclude']`           | `undefined`                        |
| `extractComments` | `TerserWebpackPlugin.BasePluginOptions['extractComments']`   | `false`                            |
| `parallel`        | `TerserWebpackPlugin.BasePluginOptions['parallel']`          | `true`                             |
| `terserOptions`   | `TerserWebpackPlugin.TerserOptions`                          | `[object]`                         |

- When [@roots/bud-swc](https://bud.js.org/extensions/bud-swc) is installed the swc minifier function will be used.
- When [@roots/bud-esbuild](https://bud.js.org/extensions/bud-esbuild) is installed the esbuild minifier function will be used.

## API

### bud.minify.js.getInclude

Get the value of `include`

```ts
bud.minify.js.getInclude()
```

Set the value of `include`

```ts
bud.minify.js.setInclude(/.*/)
```

### bud.minify.js.exclude

Get the value of `exclude`

```ts
bud.minify.js.getExclude()
```

Set the value of `exclude`

```ts
bud.minify.js.setExclude(/.*/)
```

### bud.minify.js.minify

Get the value of `minify`.

```ts
bud.minify.js.getMinify()
```

Set the value of `minify`. Since the value is a function you must wrap it in a callback.

```ts
const dubiousMinifier = async (input: unknown) => ({
  code: Object.values(input).join(`\n`).replace(/\/\//g, `// 💸`),
})

bud.minify.js.setMinify(() => dubiousMinifier)
```

### bud.minify.js.parallel

Get the value of `parallel`.

```ts
bud.minify.js.getParallel()
```

Set the value of `parallel`.

```ts
bud.minify.js.setParallel(true)
```

### bud.minify.js.extractComments

Get the value of `extractComments`.

```ts
bud.minify.js.getExtractComments()
```

Set the value of `extractComments`.

```ts
bud.minify.js.setExtractComments(true)
```

### bud.minify.js.terserOptions

Get the value of `terserOptions`.

```ts
bud.minify.js.getTerserOptions()
```

Set the value of `terserOptions`.

```ts
bud.minify.js.setTerserOptions(options => ({
  ...options,
  mangle: false,
}))
```

### bud.minify.js.dropComments

Drop comments from output:

```typescript
export default async bud => {
  bud.minify.js.dropComments()
}
```

### bud.minify.js.dropConsole

Drop `console.*` statements from output.

```typescript
export default async bud => {
  bud.minify.js.dropConsole()
}
```

## License

@roots/bud-terser is licensed under MIT.
