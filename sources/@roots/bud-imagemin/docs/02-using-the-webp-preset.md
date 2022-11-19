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

This is an example of a generator, and you're able [to add additional ones if you'd like](#generators).
