---
title: react-refresh
---

This extension enables [react-refresh](https://www.npmjs.com/package/react-refresh) in development. It uses [@pmmmwh/react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin).

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

Any [@pmmmwh/react-refresh-webpack-plugin](https://github.com/pmmmwh/react-refresh-webpack-plugin) options can can be passed to `bud.react.refresh.configure`:

```ts
bud.react.refresh.configure({forceEnable: true})
```

### Compatibility

#### Babel

react-refresh is automatically enabled when using [@roots/bud-babel](https://bud.js.org/extensions/bud-babel). This is the integration that is supported out-of-the-box.

#### TypeScript

react-refresh is automatically enabled when using [@roots/bud-typescript](https://bud.js.org/extensions/bud-typescript).

If you are using `babel` then react-refresh will be handled using the standard babel plugin.
If you are not then the `react-refresh-typescript` tsc plugin will be used instead.

#### SWC

react-refresh is automatically enabled when using [@roots/bud-swc](https://bud.js.org/extensions/bud-swc).

If you are using a custom `.swcrc` file you will need to supply your own configuration.

#### ESBuild

There isn't currently any support for esbuild mentioned in the documentation.
