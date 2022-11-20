You may convert an asset to `webp` format using the `?as=webp` url parameter.

It works in both styles and scripts:

```css title="app.css"
body {
  background-image: url(./images/image.jpg?as=webp);
}
```

```typescript title="app.js"
import image from './images/image.jpg?as=webp'
```

You're able [to add additional generators](#generators) if you want to do the same thing with another filetype.
