---
description: bud.fs allows for reading and writing to the disk.
---

# bud.fs

## Methods

### bud.fs.get

Get the full path to a file.

#### Usage

```ts
const packagePath = bud.fs.get('package.json')
```

### bud.fs.readJson

Get the contents of a JSON file as an object.

#### Usage

```ts
const object = bud.fs.readJson('package.json')
```

### bud.fs.writeJson

Write the contents of an object to a JSON file.

#### Usage

```ts
bud.fs.writeJson('package.json', object)
```

### bud.fs.read

Get the contents of a file as a string.

#### Usage

```ts
const fileContents = bud.fs.read('src/style.css')
```

### bud.fs.write

Write a string to a file.

#### Usage

```ts
bud.fs.write('markdown.md', markdownString)
```

### bud.fs.resolveFrom

Resolve a module relative from a given root directory.

See the [resolveFrom](https://github.com/sindresorhus/resolve-from) docs for more information on using this function.

### bud.fs.glob

`fast-glob` implementation.

See the [globby](https://github.com/sindresorhus/globby) docs for more information on using this function.

### Additional utilities

#### fs-extra functions

Bud has all the [fs-extra](https://github.com/fs-extra) methods are bound to the `bud.fs` object. So, you can easily tap into those (`bud.fs.ensureFileSync`, et al.) when convenient.

See the fs-extra docs for more information.

#### node path functions

Bud has all of node's native path methods are bound as properties of `bud.fs`. For example, instead of needing to manually import `path.join`, you can use `bud.fs.join`.

See the node path docs for more information.
