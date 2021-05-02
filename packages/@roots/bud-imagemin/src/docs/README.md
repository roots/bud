## Overview

> Minimize image assets in @roots/bud projects.

## toc

## Installation

```sh
yarn add @roots/bud-imagemin --dev
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

Customize imagemin plugins with `bud.imagemin`.

```js
bud.imagemin([
  ['gifsicle', {interlaced: true}],
  ['jpegtran', {progressive: true}],
  ['optipng', {optimizationLevel: 5}],
  ['svgo', {plugins: [{removeViewBox: false}]}],
])
```
