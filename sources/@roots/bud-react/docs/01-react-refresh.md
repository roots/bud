`@roots/bud-react` enables [react-refresh](https://www.npmjs.com/package/react-refresh) in development automatically. It uses [@pmmmwh/react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin).

For usage guidance, consult [the react-refresh-webpack-plugin API documentation](https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/API.md).

### Configuring react-refresh

To enable react-refresh:

```ts
bud.react.refresh(true)
```

To disable react-refresh:

```ts
bud.react.refresh(false)
```

Any react-refresh-webpack-plugin options can can be passed using an object:

```ts
bud.react.refresh({forceEnable: true})
```

Again, consult the [react-refresh-webpack-plugin documentation for guidance on how these options work](https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/API.md#reactrefreshpluginoptions).

### react-refresh compatibility

react-refresh is fully compatible with `@roots/bud-babel`. This is the integration that is supported out-of-the-box.

#### SWC

If you have installed `@roots/bud-swc`, the swc transpiler should automatically enable react-refresh in `development`.

If you are using a custom .swcrc file you will need to handle this on your own.

```json
{
  jsc: {
    transform: {
      react: {
        development: isDevelopment,
        refresh: isDevelopment,
      },
    },
  },
}
```

#### TypeScript

If you are using `@roots/bud-typescript` and have configured it to not use babel:

```ts
bud.typescript.useBabel(false)
```

`@roots/bud-typescript` will automatically enable the `react-refresh-typescript` transformer. To disable this:

```ts
bud.typescript.reactFastRefresh(false)
```

#### ESBuild

There isn't currently any support for esbuild mentioned in the react-refresh-webpack-plugin documentation.
