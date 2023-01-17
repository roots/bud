---
title: Manipulating images with URL parameters
---

## Convert to `webp`

You can convert an asset to `webp` format using the `?as=webp` url parameter.

It works in both styles and scripts:

```css title="app.css"
body {
  background-image: url(./images/image.jpg?as=webp);
}
```

```typescript title="app.js"
import image from './images/image.jpg?as=webp'
```

## Adding additional presets

In addition to the preconfigured `?as=webp` parameter, you may define additional generators using **bud.imagemin.addPreset**.

For example, this custom generator will convert an asset to `png` at 80% quality when `?as=png` is appended to an image asset path.

```typescript title="bud.config.mjs"
export default async bud => {
  bud.imagemin.sharp.setGenerator(`png`, {
    options: {
      encodeOptions: {
        quality: 80,
      }
    },
  })
}
```

## Set dimensions

You can set an explicit width for an image with the `?width=n` url parameter. Likewise, you can set an explicit height with `?height=n`.

It works in both styles and scripts:

```css title="app.css"
body {
  background-image: url(./images/image.jpg?width=500&height=500);
}
```

```typescript title="app.js"
import image from './images/image.jpg?width=500&height=500'
```

