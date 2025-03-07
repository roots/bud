<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-swc</strong></h1>

<p align="center">
  SWC transpilation extension for Bud projects
</p>

---

## Installation

Install **@roots/bud-swc** to your project.

Yarn:

```sh
yarn add @roots/bud-swc --dev
```

npm:

```sh
npm install @roots/bud-swc --save-dev
```

## Configuration

**@roots/bud-swc** works with zero configuration. But there is a robust and developer friendly configuration API should you need to make a modification to the provided defaults.

## Configuration with .swcrc

Including a `.swcrc` config file in the root of your project will replace all default options.

This is not recommended if you want to use other extensions which manipulate swc options (like **@roots/bud-react** and **@roots/bud-emotion**).

## Configuration with `bud.swc`

You can configure `jsc` with the `bud.swc.setJsc` method:

```ts title=bud.config.ts
bud.swc.setJsc({
  baseUrl: `/base/url/`,
});
```

```ts title=bud.config.ts
bud.swc.setJsc((jsc = {}) => ({
  ...jsc,
  baseUrl: `/base/url/`,
}));
```

Many `jsc` options have associated helper methods which don't require using `bud.swc.setJsc` directly. These should be preferred over `bud.swc.setJsc` whenenver possible.

### jsc.baseUrl

Use the `bud.swc.setBaseUrl` method to configure `jsc.baseUrl`

```ts title=bud.config.ts
bud.swc.setBaseUrl(`/base/url/`);
```

### jsc.externalHelpers

Use the `bud.swc.setExternalHelpers` method to configure `jsc.externalHelpers`

```ts title=bud.config.ts
bud.swc.setExternalHelpers(true);
```

### jsc.experimental

Use the `bud.swc.setExperimental` method to configure `jsc.experimental`

```ts title=bud.config.ts
bud.swc.setExperimental({ plugins: [] });
```

If you want to set `jsc.experimental.plugins` you may wish to use the [`bud.swc.setPlugins` method](#plugins).

### jsc.loose

Use the `bud.swc.setLoose` method to configure `jsc.loose`

```ts title=bud.config.ts
bud.swc.setLoose(true);
```

### jsc.minify

Use the `bud.swc.setMinify` method to configure `jsc.minify`

```ts title=bud.config.ts
bud.swc.setMinify(true);
```

### jsc.parser

To configure the parser you can use [bud.swc.setParser].

Example:

```ts title=bud.config.ts
bud.swc.setParser({ decorators: false });
```

Note that `jsx.parser.syntax`, `jsc.parser.jsx` and `jsc.parser.tsx` will be overwritten by [syntax specific configuration](#syntax-specific-jsc-configuration). You should change those options using `bud.swc.ecmascript.setParser` or `bud.swc.typescript.setParser` instead of using the base options.

### jsc.preserveAllComments

Use the `bud.swc.preserveAllComments` method to oconfigure `jsc.preserveAllComments`

```ts title=bud.config.ts
bud.swc.preserveAllComments(false);
```

### jsc.target

Use the `bud.swc.setTarget` method to configure `jsc.target`

```ts title=bud.config.ts
bud.swc.setTarget(`es5`);
```

### jsc.transform

Use the `bud.swc.setTransform` method to configure `jsc.transform`

```ts title=bud.config.ts
bud.swc.setTransform({});
```

## Syntax specific jsc configuration

SWC supports both `ecmascript` and `TypeScript`. If you want to make changes to the `jsc` config which are only applied to a specific syntax, you can make overrides using `bud.swc.ecmascript` and `bud.swc.typescript`, respectively.

```ts title=bud.config.ts
bud.swc.ecmascript.setKeepClassNames(true);
bud.swc.typescript.setKeepClassNames(false);
```

All of the above `jsc.*` options work the same way as detailed above.

## Plugins

Use the `bud.swc.setPlugins` method to configure `experimental.plugins`:

```ts title=bud.config.ts
bud.swc.setPlugins([["some-swc-plugin", {}]]);
```

```ts title=bud.config.ts
bud.swc.setPlugins((plugins = []) => [...plugins, ["some-swc-plugin", {}]]);
```

## Env

Use the `bud.swc.setEnv` method to configure swc `env` options:

```ts title=bud.config.ts
bud.swc.setEnv({
  targets: `Chrome >= 48`,
});
```

## Source maps

Use the `bud.swc.setSourceMaps` method to configure the swc `sourceMaps` option:

```ts title=bud.config.ts
bud.swc.setSourceMaps(`inline`);
```

## Typechecking

`@roots/bud-swc` does not currently support typechecking during compilation as swc does not natively support it yet.

Our recommendation is to run typechecking as a separate process. You can use `tsc` directly: `tsc --noEmit`.

You could also add the `fork-ts-webpack-plugin`.

Subscribe to [swc-project/swc#571](https://github.com/swc-project/swc/issues/571) for more information on where swc-project is at with its typecheck implementation.

## License

@roots/bud-swc is licensed under MIT.
