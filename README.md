<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://twitter.com/rootswp">
    <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?style=flat-square&color=1da1f2" />
  </a>
</p>

<h1 align="center">
  <strong>@roots/bud</strong>
</h1>

## Overview

A webpack framework combining the best parts of Laravel Mix and Symfony Encore.

## Installation

`yarn add @roots/bud --dev`

## Geting started

Bud centers around a configuration file situated in the root of the project.

Dead simple example:

```js
const bud = require('@roots/bud')

bud.entry('app', ['app.js']).run()
```

Users with a modern version of Node can do this in a more modular way:

> _For the rest of the README we'll use `import` syntax but no destructuring in a bid to reduce confusion in a divided community. So, if your project still uses `require` syntax for modules just replace the imports. And, if you use `imports`, keep in mind that you can destructure them as you wish._

```js
import {entry, run} from '@roots/bud'

entry('app', 'app.js')

run()
```

The framework can do many more things. But a central philosophy of the framework is that more is not always better for many common use cases. In fact, with just `bud`, `entry` and `run` you can already compile project files. For many people this may very well be enough.

A more advanced configuration might look like this:

```js
import bud from '@roots/bud'

bud
  .use([
    '@roots/bud-babel',
    '@roots/bud-postcss',
    '@roots/bud-react',
  ])

  .library(['react', 'react-dom'])

  .entry({
    app: ['app.js', 'app.css'],
    landing: 'landing.js',
  })

  .when(
    bud.mode.is('production'),
    bud => bud.minify(),
    bud => bud.devtool('eval-source-map'),
  )

  .run()
```

This does a whole lot! Hopefully, it doesn't overwhelm you too much.

## Running a build

With your config file in place run the following command:

`$ yarn bud build`

You should see your built assets in the `dist` directory of your project.

## Configuration API

| Tool            | Description                         | Documentation                                      |
| --------------- | ----------------------------------- | -------------------------------------------------- |
| bud.addPlugin   | Use a Webpack plugin                | [docs/config-addPlugin.md](https://git.io/JTNGA)   |
| bud.alias       | Easy module imports                 | [docs/config-alias.md](https://git.io/JTNGh)       |
| bud.brotli      | Apply brotli compression            | [docs/config-brotli.md](https://git.io/JTNZv)      |
| bud.copy        | Copy files                          | [docs/config-copy.md](https://git.io/JTNGb)        |
| bud.define      | Define global constants             | [docs/config-define.md](https://git.io/JTNZk)      |
| bud.dev         | Configure dev server                | [docs/config-dev.md](https://git.io/JTNGb)         |
| bud.devtool     | Configure sourcemaps                | [docs/config-devtool.md](https://git.io/JTNGb)     |
| bud.dist        | Get the `dist` dir path             | [docs/config-dist.md](https://git.io/JTNGF)        |
| bud.distPath    | Define the `dist` dir path          | [docs/config-distPath.md](https://git.io/JTNGQ)    |
| bud.entry       | Add source files                    | [docs/config-entry.md](https://git.io/JTNG9)       |
| bud.glob        | Create an entrypoint with wildcards | [docs/config-glob.md](https://git.io/JTNGS)        |
| bud.gzip        | Apply gzip compression              | [docs/config-gzip.md](https://git.io/JTNGD)        |
| bud.hash        | Add version string to assets        | [docs/config-glob.md](https://git.io/JTNGP)        |
| bud.library     | Create a DLL                        | [docs/config-library.md](https://git.io/JTNZO)     |
| bud.minify      | Minify assets                       | [docs/config-minify.md](https://git.io/JTNZl)      |
| bud.project     | Get the project root                | [docs/config-project.md](https://git.io/JTNZ0)     |
| bud.projectPath | Define the project root dir         | [docs/config-projectPath.md](https://git.io/JTNnl) |
| bud.provide     | Make a module available globally    | [docs/config-provide.md](https://git.io/JTNnC)     |
| bud.publicPath  | Define the browser URI of assets.   | [docs/config-publicPath.md](https://git.io/JTNns)  |
| bud.runtime     | Code split with a runtime chunk     | [docs/config-runtime.md](https://git.io/JTNnT)     |
| bud.src         | Get the `src` dir path              | [docs/config-src.md](https://git.io/JTNnf)         |
| bud.srcPath     | Define the `src` dir path           | [docs/config-srcPath.md](https://git.io/JTNnv)     |
| bud.template    | Generate HTML boilerplate           | [docs/config-template.md](https://git.io/JTNZj)    |
| bud.terser      | Configure the terser minifier       | [docs/config-terser.md](https://git.io/JTNZx)      |
| bud.use         | Extend Bud's core functionality     | [docs/config-use.md](https://git.io/JTNZA)         |
| bud.vendor      | Separate vendor code from app code  | [docs/config-vendor.md](https://git.io/JTNZN)      |
| bud.when        | Conditional control of build steps  | [docs/config-when.md](https://git.io/JTNZ0)        |

## Extensions

Bud, by itself, provides an intentionally sparse set of features.

In fact, much of the core of Bud is actually made up of extensions. This is to make it easy for developers and extension authors to swap out parts of the framework as needed.

Suffice to say, extensibility is a fundamental design tenant of Bud as software. You will likely want to utilize extensions in your project.

### First-party extensions

There are a number of Roots maintained extensions available to kickstart your projects. For more information on using them refer to [the documentation on `bud.use`](https://github.com/roots/bud/tree/master/docs/config-use.md) and the extension README.

| Name                           | Description                     | Usage                                                                                                      |
| ------------------------------ | ------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| @roots/bud-babel               | Adds babel support.             | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-babel/README.md)       |
| @roots/bud-eslint              | Adds eslint support.            | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-eslint/README.md)      |
| @roots/bud-wordpress-manifests | WP specific build tooling.      | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-manifests/README.md)   |
| @roots/bud-purgecss            | Adds purgecss support.          | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-purgecss/README.md)    |
| @roots/bud-react               | Adds react support.             | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-react/README.md)       |
| @roots/bud-sass                | Adds sass preprocessor support. | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-sass/README.md)        |
| @roots/bud-stylelint           | Adds stylelint support.         | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-stylelint/README.md)   |
| @roots/bud-tailwindcss         | Adds tailwindcss support.       | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-tailwindcss/README.md) |
| @roots/bud-typescript          | Adds typescript support.        | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-typescript/README.md)  |
| @roots/bud-vue                 | Adds Vue framework support.     | [Usage ↗](https://github.com/roots/bud-support/blob/%40roots/bud/packages/extension-vue/README.md)         |

## Configuring development vs. production

Use `bud.mode` to get, set and check the compiler mode. For more information [see the `bud.mode` docs](https://github.com/roots/bud/tree/master/docs/components-mode). If you're uncertain what this is for _at all_, you should read [the webpack docs](https://webpack.js.org/configuration/mode/) (this is a critical concept for webpack).

### bud.mode.get

Returns the mode as a `string`.

```js
bud.mode.get()
```

### bud.mode.set

Sets the mode. Valid options: `production`, `development`, `none`

```js
bud.mode.set('production')
```

### bud.mode.is

Returns boolean `true` if mode matches the query arg.

```js
bud.mode.is('development')
  ? () => // only in dev,
  : () => // production time
```

## Hooks

Bud provides a system of 'hooks' to expose values for easier modification.

As an example, this hook adds a new entry to the `webpack.externals` configuration:

```js
bud.hooks.on('webpack.externals', externals => ({
  ...externals,
  $: 'jquery',
})
```

For more information on hooks, including a list of available hooks, reference [the documentation on hooks](https://github.com/roots/bud-support/tree/master/docs/components-hooks.md).

## Environment variables

You can use variables defined in a `.env` in your build with no extra configuration needed.

```js
bud.env.has('APP_NAME') ? bud.env.get('APP_NAME') : 'Fallback'
```

You can also use them in your application code.

```js
import {APP_NAME} from 'window'
console.log(APP_NAME)
```

### Making an env value secret

To keep an env value out of your application code, include the string `SECRET` in the variable name:

```env
SECRET_LICENSE_KEY="867-5309"
```

## Reading and writing files

The `bud.fs` and `bud.disk` objects make it a cinch to read and write to the filesystem.

Get the contents of a JSON file as an object:

```js
const package = bud.fs.readJson('package.json')
```

Change it up:

```js
bud.fs.writeJson('package.json', {
  ...package,
  features: ['easy', 'file', 'handling'],
})
```

Write pretty markdown (uses `prettier`):

```js
bud.fs.write(
  'README.md',
  bud.util.pretty(`
    # Hi, mom!
    No reason to even fret all that blank space at the start
        of the line.
  `),
)
```

For more information on filesystem handling reference [the documentation](https://github.com/roots/bud-support/tree/master/docs/components-disk.md).

## Command-line flags

### --mode

Set the mode.

`$ bud build --mode production`

### --minify

Minify built assets

`$ bud build --minify`

### --runtime

Generate a runtime manifest

`$ bud build --runtime`

### --src

Set the src path (relative to cwd)

`$ bud --src "assets/js"`

### --dist

Set the dist path (relative to cwd)

`$ bud --dist "build"`

### --gzip

Enable gzip compression

`$ bud --gzip`

### --brotli

Enable brotli compression

`$ bud --brotli`

### --html

Enables template generation.

`$ bud build --html`

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)

```

```

```

```

```

```
