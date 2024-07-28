---
title: Usage
---

Call **bud.spa** to enable configure bud.js for single page applications.

It is fine to call **bud.spa** with no parameters. bud.js will use a default port:

```ts title=bud.config.ts
export default async bud => {
  bud.spa()
}
```

If you want to configure beyond the defaults you may do so using a string, number or URL.

Using a string:

```ts title=bud.config.ts
export default async bud => {
  bud.spa(`http://localhost:3030`)
}
```

Using a [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL):

```ts title=bud.config.ts
export default async bud => {
  bud.spa(new URL(`http://localhost:3030`))
}
```

Using a number:

```ts title=bud.config.ts
export default async bud => {
  bud.spa(3030)
}
```
