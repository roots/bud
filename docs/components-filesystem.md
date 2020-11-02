---
description: bud.fs allows for reading and writing project files.
---

# Filesystem

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
