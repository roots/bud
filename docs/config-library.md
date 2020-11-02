---
description: Generate a long-life DLL cache
---

# bud.library

`bud.library` enables DLL ([dynamic link library](https://en.wikipedia.org/wiki/Dynamic-link_library)) caching of specified libraries/modules. This can improve developer build times for vendored dependencies which do not frequently change.

`bud.library` differs from `bud.vendor` in that it doesn't just separate the vendored code from the application code, but actually stops the vendored assets from needing to be rebuilt at all.

It seems like a superpower, but you know the superhero trope: with great power _something something an invalidated bundle cache_.. point being: it's rad but you have to use discretion.

Updating a package will invalidate the DLL so the longer the life of the package added to the library, the better. Adding a package which is updated frequently to the library will diminish the benefit for packages with a longer shelf life.

The first build will likely take longer as the DLL will need to be compiled, but subsequent builds should see a noticeable reduction in build time.

## Usage

Pass `bud.library` the module you would like to add to the DLL cache:

```js
bud.library('jquery')
```

Multiple modules can be added at once by passing an array:

```js
bud.library(['jquery', 'bootstrap'])
```

This functionality is untested when used alongside code splitting &mdash; if you are concerned about your bundle size or are using lazy loading techniques, you may wish to set `bud.library` to apply only in development. You have to judge for yourself if it is worth it or not. But, using a DLL can cut off 90%+ of your build time.

```ts
bud.when(bud.mode.is('development'), () =>
  bud.library(['react', 'react-dom']),
)
```

## Signature

```ts
function (
  modules: string | string[]
): Framework.Bud
```

## Arguments

| Name      | Type                 |
| --------- | -------------------- |
| `modules` | `string`, `string[]` |

## Returns

`Framework.Bud`: Bud instance
