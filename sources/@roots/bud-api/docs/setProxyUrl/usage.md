---
title: Usage
---

Using a string:

```ts title=bud.config.ts
export default async bud => {
  bud.setProxyUrl(`http://example.test`)
}
```

Using a [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL):

```ts title=bud.config.ts
export default async bud => {
  bud.setProxyUrl(new URL(`http://example.test`))
}
```
