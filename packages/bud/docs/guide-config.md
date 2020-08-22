---
description: The build config file is the keystone of Bud. Let's walk through a simple example.
---

# Configuration

The build config file is the keystone of Bud. In this guide we'll look at a simple hypothetical project and walk through the basics of how it works.

[[toc]]

## Example config

Assuming the following project structure:

```sh
root
├── bud.config.js
├── dist
├── package.json
└── resources
    ├── scripts
    └── styles
```

Our minimal config file might look something like this:

```js
const bud = require('@roots/bud')()

bud
  .srcPath('resources')
  .distPath('dist')
  .bundle('app', [
    bud.src('scripts/app.js'),
    bud.src('styles/app.css'),
  ])
  .compile()
```

## Set project paths

```js{4-5}
const bud = require('@roots/bud')()

bud
  .srcPath('resources')
  .distPath('dist')
  .bundle('app', [
    bud.src('scripts/app.js'),
    bud.src('styles/app.css'),
  ])
  .compile()
```

First, we set the paths of important project directories. Bud includes a number of functions to help make sure your assets can be found by your build tools.

[bud.srcPath](config-srcPath.md) indicates where the project source files are located.

[bud.distPath](config-distPath.md) indicates the directory to emit compiled assets.

If you are running the config outside the project root, you may also need to specify the path of the project itself. This is done with [bud.projectPath](config-projectPath.md). If you are using this function, __use it before specifying [bud.srcPath](config-srcPath.md) and [bud.distPath](config-distPath.md)__, as they utilize the value set here.

```js
/** First, set the project path */
bud.projectPath('/abs/path/to/project')

/** Now, it is safe to set the src and dist directories */
bud.srcPath('resources/assets')
bud.distPath('dist')
```

These values may be utilized throughout the rest of the config using functions like [bud.src](config-src.md), [bud.dist](config-dist.md), and [bud.project](config-project.md). You'll see them used throughout this guide when specifying paths.

## Bundle source files

```js{6-9}
const bud = require('@roots/bud')

bud
  .srcPath('resources')
  .distPath('dist')
  .bundle('app', [
    bud.src('scripts/app.js'),
    bud.src('styles/app.css'),
  ])
  .compile()
```

[bud.bundle](config-bundle.md) is used to group your source assets into distinct distributables. It takes two arguments, indicating:

1. the bundle name; and
2. the source files to include.

### 1. The bundle name

```js{2}
bud.bundle(
  'app',
  [bud.src('scripts/app.js')]
)
```

__The first argument__ is a `string` and it names the outputted file(s).

::: tip No extension required
There is no reason to include an extension in the bundle name &mdash; Bud will determine the appropriate extension to use for the source files.
:::

All bundled assets will be compiled to the root of the [bud.dist](/config-dist.md). If you want to group compiled assets into subdirectories within dist, you may do so by including a `/` in the bundle name:

```js{2}
bud.bundle(
  'scripts/app',
  [bud.src('scripts/app.js')]
)
```

### 2. The bundle source(s)

```js{2}
bud.bundle(
  'app',
  [bud.src('scripts/app.js')]
)
```

__The second argument__ is an `array` of source files to include in the bundle.

It is totally fine to specify more than one source file per bundle (hence, the name: `bundle`). You can even use files of different types.

```js{3-4}
/** Bundle includes js and css assets and that's OK */
bud.bundle('app', [
  bud.src('scripts/app.js'),
  bud.src('styles/app.css'),
])
```

If files can't be concatenated, as is the case with the script and style source files above, there will be multiple outputs generated.

## Finalize the config

```js{10}
const bud = require('@roots/bud')

bud
  .srcPath('resources')
  .distPath('dist')
  .bundle('app', [
    bud.src('scripts/app.js'),
    bud.src('styles/app.css'),
  ])
  .compile()
```

The last step invokes the compiler.
