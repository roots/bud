---
description: Specify the root directory of the project's source files.
---

# bud.copy

`bud.copy` allows you to copy static assets to your output directory.

You can specify a path to a specific file or use [fast-glob](https://github.com/mrmlnc/fast-glob) style globbing to move over sets of files.

Uses [globby](https://github.com/sindresorhus/globby) under the hood.

## Usage

Copy all files from `src/images`:

```js
bud.copy({from: 'images/**/*'})
```

Copy all files from a path outside of `bud.src`:

```js
bud.copy({from: 'images/**/*', context: bud.project('assets')})
```

Copy all files to a path outside of `bud.dist`:

```js
bud.copy({from: 'images/**/*', to: '/app/cdn/media'})
```

## Signature

```ts
function ({
  from: string,
  context?: string,
  to?: string,
  globOptions?: {[key: string]: any}
}): Framework.Bud
```

## Parameters

| Name   | Type   |
| ------ | ------ |
| `from` | string |
| `context`   | string |
| `to` | string |
| `globOptions` | {[key: string]: any} |

## Returns

The Bud instance.
