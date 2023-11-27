---
title: Usage
---

Using a string:

```ts title=bud.config.ts
export default async bud => {
  bud.setPublicProxyUrl(`http://example.test`)
}
```

Using a [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL):

```ts title=bud.config.ts
export default async bud => {
  bud.setPublicProxyUrl(new URL(`http://example.test`))
}
```
