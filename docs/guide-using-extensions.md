---
description: Install extensions to meet your unique project needs.
---

# Using extensions

Bud includes support for extending the framework with optional functionality.

Let's get acquainted with how extensions are used by adding sass support to our build.

[[toc]]

## Installing

We're going to add sass support using the [@roots/bud-sass](bud-sass.md) extension.

### Installation with yarn

```sh
yarn add @roots/bud-sass -D
```

### Installation with npm

```sh
npm install @roots/bud-sass --save-dev
```

## Register the extension

We can register this super simply with the package name.

```js
bud.use('@roots/bud-sass')
```

Were there need for additional extensions, they could be added to the [bud.use](config-use.md) array alongside `sass`.

```js
bud.use(['@roots/bud-sass', '@roots/bud-typescript'])
```

## Other styles of registering

We can resolve the path explicitly:

```js
bud.use(require.resolve('@roots/bud-sass'))
```

We can include the extension as an object. This requires formatting the extension as [a tuple](https://en.wikipedia.org/wiki/Tuple).

```ts
// pseudo definition:
[name (string), extension (obj)]

// ts definition
[name, extension] = [string, {[key: string]: any}]
```

The first parameter is a name for the extension (when using a module this name value is taken from the module's `package.json` file). The second is the extension object itself:

```js
bud.use(['sass', require('@roots/bud-sass')])
```

This seems kind of silly in this context (since we can just pass `@roots/bud-sass`!), but it is a handy way to to quickly iterate on your own modules without needing to write packaging boilerplate.

```js
/**
 * Inline bud extension which lets the user set a `webpack.target`
 */
bud.use(['my-module', {
  /**
   * Extension options
   */
  options: {target: 'web'}

  /**
   * Stuff to do when extension boots
   */
  boot: (bud) => {
    const {target} = bud.extensions.getOptions('my-module')

    bud.config.set('target', target)
  },

  /**
   * Define custom bud functions
   */
  api: {
    // bud.target()
    target: function (target) {
      bud.extensions.setOptions('my-module', {target})
    },
  },
}])
```

For more information, see the extensions API documentation (assuming it's been written).
