---
description: Specify the root directory of the project's source files.
---

# bud.copy

`bud.copy` allows you to copy static assets to your output directory.

You can specify a path to a specific file or use
glob syntax to match many files at once.

## Usage

Copy all files from `src/images`:

```js
bud.copy('images/**/*')
```

### options.context

Copy all files from a path outside of `bud.src`:

```js
bud.copy('images/**/*', {context: bud.project('assets')})
```

### options.to

Copy all files to a path outside of `bud.dist`:

```js
bud.copy('images/**/*', {to: '/app/cdn/media'})
```

### options.globOptions

Modify glob options.

```js
bud.copy('images/**/*', {
  globOptions: {ignore: '.*'},
})
```

## Signature

```ts
function (
  from: string,
  options: {
    context?: string,
    to?: string,
    globOptions?: {[key: string]: any}
    noErrorOnMissing?: boolean
  },
): Framework.Bud
```

## Parameters

| Name          | Type                 |
| ------------- | -------------------- |
| `from`        | string               |
| `context`     | string               |
| `to`          | string               |
| `globOptions` | {[key: string]: any} |

## Returns

The Bud instance.
