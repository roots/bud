---
title: Setting encoder options
---

You may wish to customize the encoder settings. This is done with **bud.imagemin.svgo.setEncodeOptions** and **bud.imagemin.sharp.setEncodeOptions**.

## Enable lossless compression

```typescript
export default async bud => {
  bud.imagemin.lossless()
}
```

## Setting sharp encoder options

```typescript title="bud.config.mjs"
export default async bud => {
  bud.imagemin.sharp.setEncodeOptions({jpeg: {quality: 50}})
}
```

## Setting svgo encoder options

```typescript title="bud.config.mjs"
export default async bud => {
  bud.imagemin.svgo.setEncodeOptions({multipass: false})
}
```
