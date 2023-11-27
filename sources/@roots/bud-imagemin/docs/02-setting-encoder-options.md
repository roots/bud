---
title: Setting encoder options
---

You may wish to customize the encoder settings. This is done with **bud.imagemin.encode**.

```ts title=bud.config.ts
export default async bud => {
  bud.imagemin.encode(`jpeg`, {quality: 50})
  bud.imagemin.encode(`svg`, {multipass: false})
}
```

### Enable lossless compression

```ts title=bud.config.ts
export default async bud => {
  bud.imagemin.lossless()
}
```
