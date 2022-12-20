---
title: Options
---

You can pass a function to **bud.proxy** to manipulate all options. You must return them or the options will not be set!

```ts title='bud.config.ts'
bud.proxy((options = {}) => {
  options.target = 'https://example.test'
  return options
})
```

You can also pass an object to **bud.proxy** to set options. This will not overwrite unspecified defaults or options set elsewhere:

```ts title='bud.config.ts'
bud.proxy({
  target: 'https://example.test',
  changeOrigin: false,
})
```

Options can be specified as a second parameter (instead of the URL replacement array):

```ts title='bud.config.ts'
bud.proxy('https://example.test', {
  changeOrigin: false,
})
```
