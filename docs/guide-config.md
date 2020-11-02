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
  .entry('app', ['scripts/app.js', 'styles/app.css'])
  .run()
```

Let's break down what is happening.

### 1. Set project paths

```js
const bud = require('@roots/bud')()

bud
  .srcPath('resources')
  .entry('app', ['scripts/app.js', 'styles/app.css'])
  .run()
```

First, we set the paths of important project directories. Bud includes a number of functions to help make sure your assets can be found by your build tools.

- [bud.projectPath](config-projectPath.md) indicates the root path of the project. Since our config file is already in the project root, we don't need to explicitly set this. However, if you are running the config outside the project root, you will need to make this explicit. This is done with [bud.projectPath](config-projectPath.md).

- [bud.srcPath](config-srcPath.md) indicates where the project source files are located.

- [bud.distPath](config-distPath.md) indicates the directory to emit compiled assets. Since our directory name matches the presumed default `dist` directory, we don't need to explicitly set this.

If you are using `bud.projectPath`, **use it before specifying [bud.srcPath](config-srcPath.md) and [bud.distPath](config-distPath.md)**.

```js
/** First, set the project path */
bud.projectPath('/abs/path/to/project')

/** Now, it is safe to set the src and dist directories */
bud.srcPath('resources/assets').distPath('dist')
```

The reason is that the value set by `bud.projectPath` is utilized by `bud.srcPath` and `bud.distPath`.

## Specifying source files

```js
const bud = require('@roots/bud')

bud
  .srcPath('resources')
  .distPath('dist')
  .entry('app', ['scripts/app.js', 'styles/app.css'])
  .run()
```

[bud.entry](config-entry.md) is used to group your source assets into distinct distributables. It takes two arguments, indicating:

1. the entrypoint name; and
2. the source files to include.

An `entry` or `entrypoint` may be referred to in other ways, depending on context. Often, you'll here people describe a "root" file or the "main" file. These terms all mean the same thing, but in the context of webpack, `entry` is the most common term used for this referent.

#### 1. The entry name

```js
bud.entry('app', 'scripts/app.js')
```

**The first argument** is a `string` and it names the outputted file(s).

::: tip No extension required
There is no reason to include an extension in the bundle name &mdash; Bud will determine the appropriate extension to use for the source files.
:::

All bundled assets will be compiled to the root of the [bud.dist](/config-dist.md). If you want to group compiled assets into subdirectories within dist, you may do so by including a `/` in the bundle name:

```js
bud.entry('scripts/app', 'scripts/app.js')
```

#### 2. The entry source(s)

```js
bud.entry('app', 'scripts/app.js')
```

**The second argument** is either a `string` or an `array` of source files to include in the entry bundle.

Use the array form to specify more than one source file per bundle. You may include files of different types in the same entrypoint.

```js
/** Bundle includes js and css assets and that's OK */
bud.entry('app', ['scripts/app.js', 'styles/app.css'])
```

If a set of sources can't be concatenated, as is the case with the script and style sources above, there will be multiple output files generated.

### 3. Run the build

```js
bud.run()
```

The last step runs the build and outputs the build results using the bud cli.

If you want to use vanilla webpack to run your build, more power to you! Rename your file `webpack.config.js` and change the final line to export the configuration directly:

```js
module.exports = bud.build.make()
```
