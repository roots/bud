---
description: Extend Bud with additional packaged functionality.
---

# bud.use

Registers a [Bud extensions](guide-using-extensions.md).

## Usage

We can register this super simply with the package name.

```js
bud.use('@roots/bud-sass')
```

Were there need for additional extensions, they could be added to the [bud.use](config-use.md) array alongside `sass`.

```js
bud.use(['@roots/bud-sass', '@roots/bud-typescript'])
```

## Taking it further

We can resolve the path explicitly:

```js
bud.use(require.resolve('@roots/bud-sass'))
```

We can include the extension as an object. This requires formatting the extension as [a tuple](https://en.wikipedia.org/wiki/Tuple).

The first value is a name for the extension (with a proper module this value is derived from the `package.json` file). The second value is the extension object itself:

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

Lastly, you can also add object extensions in the tuple format as described above as an array. And within that array you can import extensions in any of the ways described above (no need for them all to be the same format).

```ts
/**
 * A bit sloppy, but it'll do.
 */
bud.use([
  ['myExtension', bud => null],
  '@roots/bud-sass',
  ['@roots/bud-typescript', require('@roots/bud-typescript')],
])
```

## Arguments

| Name        | Type   |
| ----------- | ------ |
| `extension` | string |

```

```
