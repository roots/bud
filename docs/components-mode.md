---
description: Get and set the webpack compiler mode setting.
---

# bud.mode

Builds are usually configured differently for `production` and `development` environments.

This simple utility is pretty much solely focused on getting, setting and checking that value.

See the [Webpack documentation on `webpack.mode`](https://webpack.js.org/configuration/mode/) for more information on the property itself.

## bud.mode.get

Get the current mode.

```ts
bud.mode.get()
```

## bud.mode.set

Set the current mode.

```ts
bud.mode.set('production')
```

## bud.mode.is

Check if current mode matches a certain value.

```ts
const {isProduction} = bud.mode.is('production')
```

Pairs very well with [`bud.when`](config-when.md).

```ts
bud.when(
  bud.mode.is('development'),
  () => console.log('just development things'), // only ran in dev
  () => console.log('must be production/none'), // not ran in dev
)
```
