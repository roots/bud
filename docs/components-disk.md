---
description: bud.disk is a meta container of `bud.fs` containers
---

# bud.disk

::: warning Work-in-progress
Documentation is incomplete.

There are many `bud.fs` instances created by Bud for easy filesystem access throughout the core packages, project directories and any registered extensions.

`bud.disk` allows for accessing these various `fs` instances.

## bud.disk.get

Use an `fs` instance. Out of the box `project` and `@roots` are available.

Extensions will also have a `bud.fs` instance generated for them during registration. These are accessible using the extension's `package.json` name field (the same string it was registered with).

### Usage

Retrieve a `fs` instance indexing the project root.

```ts
const project = bud.disk.get('project')
```

Retrieve a `fs` instance indexing the `@roots` [scope](https://docs.npmjs.com/about-scopes)

```ts
const library = bud.disk.get('@roots')
```

Retrieve a `fs` instance indexing an extension root (assuming the extension has been registered with [`bud.use`](config-use.md)).

```ts
const extensionFs = bud.disk.get('@roots/bud-eslint')
```
