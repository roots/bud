---
description: Specify the root directory of the project's source files.
---

# bud.copy

`bud.copy` allows you to copy static assets to your output directory.

You can specify a path to a specific file or use glob syntax to match many files at once.

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
