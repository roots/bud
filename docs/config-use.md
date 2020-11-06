---
description: Extend Bud with additional packaged functionality.
---

# bud.use

Registers a [Bud extensions](guide-using-extensions.md).

## Usage

Add support for [sass](https://sass-lang.com) using the [`@roots/bud-sass`](https://github.com/roots/bud/tree/master/packages/extension-sass) extension.

```js
bud.use('@roots/bud-sass')
```

Multiple extensions can be added with an array:

```js
bud.use(['@roots/bud-sass', '@roots/bud-typescript'])
```

## Taking it further

### Resolve your own module paths

We can resolve the path explicitly:

```js
bud.use(require.resolve('@roots/bud-sass'))
```

This likely won't have any material benefit on the project but it might provide psychological benefit in these uncertain times.

### Use an extension as an object

Rather than specifying a path to resolve the extension module from, we can also include the extension as an object directly. This requires formatting the extension as [a tuple](https://en.wikipedia.org/wiki/Tuple).

The first designation is a name for the extension (with a proper module this value is derived from the `package.json` file). The second designation is the object itself:

```js
bud.use(['sass', require('@roots/bud-sass')])
```

This seems kind of silly in this context (since we can just pass `@roots/bud-sass`!), but it is a handy way to to quickly iterate on your own modules without needing to write packaging boilerplate.

```js
/**
 * Adds a `bud.target` function.
 */
bud.use([
  'target',
  {
    // set target to `web` as default
    boot: bud => {
      bud.build.config.set('target', 'web')
    },
    api: {
      // bud.target function
      target: function (target) {
        bud.build.config.set('target', target)
        return this
      },
    },
  },
])
```

Lastly, no matter how you are specifying an extension, you can specify it as part of an array of extensions. This is demonstrated with package name style extensions above, but it applies to all formats. Moreover, within an array of extensions you can define each extension in any of the supported formats (no need for them all to match).

```ts
/**
 * A bit sloppy, but it'll do.
 */
bud.use([
  '@roots/bud-sass',
  ['myExtension', bud => {boot: () => null]},
  ['@roots/bud-typescript', require('@roots/bud-typescript')],
])
```

### Signature

```ts
function (
  extensions:
    | string
    | string[]
    | Framework.Extension.Tuple
    | Framework.Extension.Tuple,
) => Framework.Bud
```

```ts
type Tuple = [
  string,
  (
    | Framework.Extension
    | ((bud: Framework.Bud) => Framework.Extension)
  ),
]
```
