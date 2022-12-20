---
title: Usage
---

By default, **bud.proxy** will target `http://0.0.0.0`.

```ts title='bud.config.ts'
bud.proxy()
bud.proxy(true) // these are equivalent
```

The proxy can be disabled with `false`.

```ts bud.config.ts
bud.proxy(false)
```

You may use a `String` to set the proxy target:

```ts title='bud.config.ts'
bud.proxy('https://example.test')
```

Or, a `URL` object:

```ts title='bud.config.ts'
bud.proxy(new URL('https://example.test'))
```
