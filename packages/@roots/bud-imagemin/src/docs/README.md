## Installation

```sh
yarn add @roots/bud-imagemin --dev
```

You will also need to install whatever minimizer plugins you want to use:

```sh
yarn add imagemin-gifsicle imagemin-jpegtran imagemin-optipng imagemin-svgo --dev
```

Or, you can install them using the bud-cli:

```sh
yarn bud extensions:install
```

## Usage

```js
bud.use(['@roots/bud-imagemin'])
```

Out of the box `@roots/bud-imagemin` applies the following configuration:

| Plugin   | Options                               |
| -------- | ------------------------------------- |
| gifsicle | `{interlaced: true}`                  |
| jpegtran | `{progressive: true}`                 |
| optipng  | `{optimizationLevel: 5}`              |
| svgo     | `{plugins: [{removeViewBox: false}]}` |

## Configuration

Configure with `bud.imagemin`

```js
bud.imagemin([
  ['gifsicle', {interlaced: true}],
  ['jpegtran', {progressive: true}],
  ['optipng', {optimizationLevel: 5}],
  ['svgo', {plugins: [{removeViewBox: false}]}],
])
```
