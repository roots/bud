---
description: Extend Bud with your own packaged functionality.
---

# Authoring extensions

- [Naming your extension](#naming-your-extension)
- [TypeScript](#typescript)
- [The API](#the-api)
  - [register](#register)
  - [boot](#boot)
  - [Registering loaders](#register-items-loaders)
  - [Registering rules](#register-rules)
  - [Register Webpack plugins](#register-a-webpack-plugin)
- [Adding config functions to `Bud`](#adding-config-functions-to-bud)
- [Intellisense](#intellisense)
- [Adding publishable templates](#adding-publishable-templates)

Bud extensions are collections of functions exported by a JS module. They are very simple to write and have a very unopinionated API.

## Naming your extension

Extension package names should begin with `bud-`. This isn't a strict requirement, but extensions which do not follow this guideline will not be able to add publishable templates and are not usable wth the `--autodiscover` flag (automatic enabling of installed extensions). This might cause confusion with users and so we ask that you name your extension accordingly.

If your extension is under an npm organizational scope, that is fine. Your extension will still work with `--autodiscover` and can still publish templates provided you otherwise adhere to the `bud-` convention.

## TypeScript

Bud is a TypeScript project but knowing Typescript is not required to write an extension. But, we think that Typescript does make it easier to write extensions. A Bud extension is a great first TS project.

## The API

### Name

This is used to identify your extension when it is imported or required.

This is technically the only required element of a bud extension.

```ts
export const name = 'my-bud-extension'
```

### Register

Executed first in the extension lifecycle.

```ts
export const register = bud => {
  console.log('Extension has been registered')
}

// Typed
export const register: Bud.Module.Register = (bud: Bud) => {
  console.log('Extension has been registered')
}
```

### Boot

Executed after everything else.

```ts
export const boot = bud => {
  console.log('Extension has booted')
}

// Typed
export const boot: Bud.Module.Boot = (bud: Bud) => {
  console.log('Extension has been booted')
}
```

### Register items (loaders)

Register a Webpack RuleSetRule item.

```ts
export const register = ({build}) => {
  build.set('items.some-loader', {
    loader: require.resolve('some-loader'),
  })
}

// Typed
export const register: Bud.Module.Register = ({build}: Bud) => {
  build.set('items.some-loader', {
    loader: require.resolve('some-loader'),
  })
}
```

### Registering Webpack rules

Register a Webpack RuleSetRule use entry. The only real requirement to be aware of here is with `use`. It should always be defined as an array, even if there is only one loader being applied.

```ts
export const register = ({build}) => {
  build.set('rules.some-loader', {
    include: bud => bud.store.get('patterns.js'),
    exclude: bud => bud.store.get('patterns.modules'),
    use: bud => [bud.build.get('items.babel')],
  })
}
```

### Registering a webpack plugin

There are three functions used to define a Webpack plugin

| Fn      | Description                                                                      |
| ------- | -------------------------------------------------------------------------------- |
| make    | Returns the instantiated plugin                                                  |
| options | Returns the plugin options                                                       |
| when    | Return a `boolean` representing if the plugin should be used during compilation. |

It is also acceptable to pass a plain object to any of these properties (instead of a function).

#### Make

The only required function is `make`:

```ts
export const register = ({extensions}) => {
  extensions.add('plugin-name', {
    make: () => new SomePlugin(),
  })
}
```

#### When

But let's say we wanted to only apply this plugin if a particular `bud.option` value is `true`. And the user hasn't gotten their say yet, so we can't know now. This is the use case for `when`.

```ts
export const register = ({extensions}) => {
  extensions.add('plugin-name', {
    make: () => new SomePlugin(),
    when: bud => bud.options.is('some-options-key', 777),
  })
}
```

#### Options

If there are parts of the plugin which are configurable, we can use `options` instead of passing them directly to the constructor:

```ts
export const register = ({extensions}) => {
  extensions.add('plugin-name', {
    make: (options, bud) => SomePlugin(options.all()),
    options: () => ({param: 'some-value'}),
    when: (bud, options) =>
      bud.options.is('some-options-key', 777),
  })
}
```

Options will be passed to `make` as a [`bud.container`](components-container.md). Note that `options` will also be passed to `when` (as the second param, since far more frequently it is some store value which will wind up controlling whether the function is disabled/enabled). This is also reflected above, but not really used by the `when` function.

You can also define the plugin handlers outside of `register` or `boot` by simply exporting them. Below is the code used by the `mini-css-extract-plugin` used in Bud core:

```ts
import type {Module} from '@roots/bud-typings'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

/**
 * MiniCssExtractPlugin
 */
export const make: Module.Make = options =>
  new MiniCssExtractPlugin(options.all())

/**
 * Plugin options
 */
export const options: Module.Options = {}

/**
 * Run in production
 */
export const when: Module.When = bud =>
  bud.options.is('mode', 'production')

/**
 * Register mini-css-extract-plugin ruleset item
 */
export const boot: Module.Boot = app => {
  app.build.set('items.minicss', {
    loader: MiniCssExtractPlugin.loader,
    options: {},
  })
}
```

You can see that there is also a `boot` method included above. Plugins are really just a type of extension, and so they can include the other api methods detailed in this document without issue.

### Adding config functions to Bud

Either export an object called `api` or include an `api` extension object containing the functions you wish to surface.

The syntactic scope of this function is bound to the `bud` object.

```ts
export const api = {
  myFunction: function (param) {
    this.options.set('foo', param)

    return this
  },
}

// typed
export const api: Bud.Module.Api = {
  myFunction: function (this: Bud, param: any): Bud {
    this.options.set('foo', param)

    return this
  },
}
```

### Intellisense

If you are adding to the configuration interface, you should consider extending Bud's types definitions. Included below is an example addition from the `@roots/bud-library` extension.

````ts
import '@roots/bud'

declare module '@roots/bud' {
  interface Bud {
    /**
     * ## bud.library  [💁 Fluent]
     *
     * Enables DLL (dynamic link library) caching
     * of specified modules.
     *
     * ### Usage
     *
     * Supply `bud.library` the module you
     * would like to add to the DLL.
     *
     * ```js
     * bud.library('jquery')
     * ```
     *
     * Multiple modules can be added at once by
     * passing an array.
     *
     * ```js
     * bud.library(['react', 'react-dom'])
     * ```
     */
    library: Bud.Library.Configure
  }

  namespace Bud.Library {
    export type Configure = (this: Bud, modules: string[]) => Bud
  }
}
````

Lastly, be sure to apply the type to the object it defines and you're set.

```ts
import {Bud} from '@roots/bud'
import AutoDllPlugin from 'autodll-webpack-plugin'

export const library: Bud.Library.Configure = function (
  modules,
) {
  this.extensions.add('autodll-webpack-plugin', {
    // ... Removed for clarity
  })

  return this
}
```

### Adding publishable templates

Include a directory in the root of your extension called `publish`. Any files added to this directory will available for use with the `bud publish` command.
