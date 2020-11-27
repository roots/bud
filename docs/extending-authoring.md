---
description: Extend Bud with your own packaged functionality.
---

# Authoring extensions

Bud extensions are collections of functions exported by a JS module. They are very simple to write and
have a very unopinionated API.

In fact, while they were designed around a modular API you're very much free to wrtie your extension as a JS
object or use class syntax if that's more comfortable.

In the end, it doesn't really matter as long as when Bud imports the default object there are units of functionality
which can be destructured from it.

That is to say, from Bud's perspective, these are all equivalent:

```js
export boot = bud => {
  // ...
}
```

```js
export default = {
  boot: bud => {
    // ...
  },
}
```

```js
class MyExtension {
  boot(bud) {
    // ...
  },
}

export default new MyExtension()
```

You can see from the extensions included in the @roots/bud repository that we're fans of the first option (JS modules). This is also the syntax used in this guide. But, ultimately, you should do what pleases you.

The only gotcha is that Bud will not invoke your extension as a `Newable` (function or class, either way). If your extension has a constructor, you should export the constructed object.

## Types

Bud is a typescript project and makes the `Extension` type available to make it easier to write quality extensions.

Typescript is not a requirement to write an extension. But, we think that Typescript does make it easier to write extensions. A Bud extension is a great first TS project.

## The API

### register

The first thing to be executed.

```ts
export register = bud => {
  console.log('Extension has been registered')
}
```

### boot

Executed immediately after registration.

```ts
export boot = bud => {
  console.log('Extension has booted')
}
```

### registerLoader

Register one Webpack loader.

```ts
export registerLoader = [
  'some-loader',
  require.resolve('some-loader')
]
```

### registerLoaders

Register one or more Webpack loaders.

```ts
export registerLoaders = {
  'some-loader': require.resolve('some-loader'),
}
```

### registerItem

Register one Webpack RuleSetRule use entry.

```ts
export registerItem = [
  'babel',
  {
    ident: 'babel',
    loader: bud => bud.build.loaders.get('babel'),
    options: bud => ({
      // options
    }),
  },
]
```

### registerItems

Register one or more Webpack RuleSetRule use entries.

```ts
export registerItems = [
  babel: {
    ident: 'babel',
    loader: bud => bud.build.loaders.get('babel'),
    options: bud => ({
      // options
    }),
  },
}
```

**Documentation WIP**

### registerRule

### registerRules

### api
