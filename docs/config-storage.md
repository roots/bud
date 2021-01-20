---
description: Specify the URI where assets are served from.
---

# bud.storage

By default Bud caches and writes build artifacts to the `.bud` directory. If you would like to handle these files differently, `bud.storage` is the function for you.

## Usage

Set the artifact/cache directory

```js
bud.storage('storage/dir')
```

## Arguments

| Name   | Type   |
| ------ | ------ |
| `path` | string |
