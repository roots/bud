### Converting to webp

You may convert an asset to `webp` format using the `?as=webp` url param:

```css title="app.css"
body {
  background-image: url(@src/images/image.jpg?as=webp);
}
```

```typescript title="app.js"
import image from './images/image.jpg?as=webp'
```

### Adding additional formats

You may add additional formats to be used in the same manner:

```typescript title="bud.config.ts"
bud.imagemin.setGenerator(`png`, {
  preset: `oxipng`,
  options: {
    encodeOptions: {
      quality: 80,
    },
  },
})
```
