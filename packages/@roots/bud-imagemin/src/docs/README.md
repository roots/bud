## Summary

Optimize image assets.

## Installation

```sh
yarn add @roots/bud-imagemin --dev
```

You will also need to install whatever minimizer plugins you want to use. Or, you can take the recommended defaults

```sh
yarn bud init
```

Out of the box you will get support for the following after running `bud init`:

| Plugin   | Options                               |
| -------- | ------------------------------------- |
| gifsicle | `{interlaced: true}`                  |
| jpegtran | `{progressive: true}`                 |
| optipng  | `{optimizationLevel: 5}`              |
| svgo     | `{plugins: [{removeViewBox: false}]}` |

If you want to install any of these plugins individually, you may. You don't need to register them with `bud.imagemin.plugins` as documented below unless you want to further tweak its config. Bud will automatically register the above plugins after you install them as a peer dep in your project.

## Usage

```js
bud.use(['@roots/bud-imagemin'])
```

## Configuration

Configure with `bud.imagemin`

### bud.imagemin.plugins

Pass an array of tuples to customize the plugins you would like to use:

```js
bud.imagemin.plugins([
  ['gifsicle', {interlaced: true}],
  ['jpegtran', {progressive: true}],
  ['optipng', {optimizationLevel: 5}],
  ['svgo', {plugins: [{removeViewBox: false}]}],
])
```
