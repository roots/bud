---
title: Usage
---

Using a string:

```typescript title=bud.config.js
export default async bud => {
  bud.setPublicProxyUrl(`http://example.test`)
}
```

Using a [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL):

```typescript title=bud.config.js
export default async bud => {
  bud.setPublicProxyUrl(new URL(`http://example.test`))
}
```
