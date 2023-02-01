---
title: Usage
---

Using a string:

```typescript title=bud.config.js
export default async bud => {
  bud.setPublicUrl(`http://example.test`)
}
```

Using a [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL):

```typescript title=bud.config.js
export default async bud => {
  bud.setPublicUrl(new URL(`http://example.test`))
}
```
