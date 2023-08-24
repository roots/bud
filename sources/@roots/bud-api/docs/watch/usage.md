---
title: Usage
---

To reload the page automatically when a particular file or directory is modified, you can use bud.watch.

All paths are relative to the project root directory:

```typescript title=bud.config.ts
bud.watch([
  `./app/config`,
  `./src/views`,
])
```

It is generally recommend to set file paths using [bud.path](/reference/bud.path):

```typescript title=bud.config.ts
bud.watch([
  bud.path(`@src/pages/page.php`)
])
```

You can use [bud.glob](/reference/bud.glob) to specify paths using pattern matching syntax:

```typescript title=bud.config.ts
bud.watch([
  bud.path(`@src/pages/**/*`)
])
```

### Setting options

All options from [chokidar](https://github.com/paulmillr/chokidar) are supported. In the future we will likely switch to node's built in file watch API, but most options are cross compatible.

Setting watch options can be accomplished in a couple ways.

You can set options along with the file paths you want to watch by passing a second parameter:

```typescript title=bud.config.ts
bud.watch([bud.path(`@src/pages`)], {
  interval: 1000,
  usePolling: true,
})
```

If you only want to set options, you can also choose to just pass the options directly:

```typescript title=bud.config.ts
bud.watch({
  interval: 1000,
  usePolling: true,
})
```
