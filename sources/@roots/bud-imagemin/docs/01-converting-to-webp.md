---
title: Converting assets to webp
---

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

