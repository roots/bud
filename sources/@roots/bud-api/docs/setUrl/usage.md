---
title: Usage
---

Using a string:

```ts title=bud.config.ts
export default async bud => {
  bud.setUrl(`http://example.test`)
}
```

Using a [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL):

```ts title=bud.config.ts
export default async bud => {
  bud.setUrl(new URL(`http://example.test`))
}
```
