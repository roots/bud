`@roots/bud-react` enables [react-refresh](https://www.npmjs.com/package/react-refresh) in development automatically. It uses [@pmmmwh/react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin).

For usage guidance, consult [the react-refresh-webpack-plugin API documentation](https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/API.md).

### Configuring react-refresh

To enable react-refresh:

```ts
bud.react.refresh.enable()
```

To disable react-refresh:

```ts
bud.react.refresh.disable()
```

Any react-refresh-webpack-plugin options can can be passed using an object to `bud.react.refresh.configure`:

```ts
bud.react.refresh.configure({forceEnable: true})
```

Again, consult the [react-refresh-webpack-plugin documentation for guidance on how these options work](https://github.com/pmmmwh/react-refresh-webpack-plugin/blob/main/docs/API.md#reactrefreshpluginoptions).

### react-refresh compatibility

react-refresh is fully compatible with `@roots/bud-babel`. This is the integration that is supported out-of-the-box.

#### TypeScript

If you are using `@roots/bud-typescript` and have configured it to not use babel:

```ts
bud.typescript.useBabel(false)
```

then the `react-refresh-typescript` transformer will be automatically enabled. To disable this:

```ts
bud.react.refresh.disable()
```

#### SWC

This is not currently supported but will be in the near future.

#### ESBuild

There isn't currently any support for esbuild mentioned in the react-refresh-webpack-plugin documentation.
