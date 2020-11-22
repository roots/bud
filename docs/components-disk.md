---
description: bud.disk is a meta container of `bud.fs` containers
---

# bud.disk

::: warning Work-in-progress
Documentation is incomplete. :::

For interacting with project files, there is a `@roots/filesystem` instance available: `bud.fs`. If you are only wanting to work with project files it's easiest to just use that.

However, there are many other `FileContainer` instances created by Bud for easy filesystem access to packages and various project subdirectories.

`bud.disk` is the means of accessing these various `FileContainer` instances. It essentially allows for you to "swap" in a registered `FileContainer` to work with. The most recently used `FileContainer` can be quickly accessed from `bud.disk.current`.

The `bud.disk` object is a [bud.container instance](components-container.md).

## bud.disk.get

Retrieve an `fs` instance. Out of the box `project` and `@roots` are available.

| disk    | path                   | notes                                                         |
| ------- | ---------------------- | ------------------------------------------------------------- |
| project | project root directory | same as `bud.fs`                                              |
| @roots  | node_modules/@roots    | [@roots scope directory](https://docs.npmjs.com/about-scopes) |

Every extension, when registered as a module, has a `FileContainer` instance generated as a part of registration. These are accessible using the extension's `package.json` name field (the same string it was registered with).

### Usage

Retrieve a `fs` instance indexing the project root.

```ts
const projectFiles = bud.disk.get('project')
```

Retrieve a `fs` instance indexing the `@roots` package scope.

```ts
const rootsFiles = bud.disk.get('@roots')
```

Retrieve a `fs` instance indexing an extension name.

```ts
const extensionFiles = bud.disk.get('@roots/bud-eslint')
```

For more information on using the retrieved disk, please refer to the [FileSystem documentation](components-filesystem.md).
