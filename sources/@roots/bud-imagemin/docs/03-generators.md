---
title: Generators
---

Generators allow you to convert one type of image asset to another by appending a URL parameter to the asset path.

With the default configuration, you [can convert an image to `webp` using the `?as=webp` url parameter](#using-the-webp-preset).

### Adding generators

You may add additional generators using **bud.imagemin.sharp.setGenerator**.

For example, this custom generator will convert an asset to `png` at 80% quality when `?as=png` is appended to an image asset path.

```typescript title="bud.config.mjs"
export default async bud => {
  bud.imagemin.sharp.setGenerator(`png`, {options: {quality: 80}})
}
```

Once set, it can be called using `?as=png` from application scripts and styles.

```css title="app.css"
.selector {
  background-image: url(./images/image.jpg?as=png);
}
```
