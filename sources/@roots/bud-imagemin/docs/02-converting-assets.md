### Converting to webp

You may convert an asset to `webp` format using the `?as=webp` url param:

```css title="app.css"
body {
  background-image: url(./images/image.jpg?as=webp);
}
```

```typescript title="app.js"
import image from './images/image.jpg?as=webp'
```

### Adding additional formats

You may add additional conversion formats using `bud.imagemin.setGenerator`:

```typescript title="bud.config.ts"
bud.imagemin.setGenerator(`png`, {
  options: {
    encodeOptions: {
      oxipng: {quality: 80},
    },
  },
})
```

See the documentation for [Image Minimizer Webpack Plugin](https://github.com/webpack-contrib/image-minimizer-webpack-plugin#generator-example-for-squoosh) for more examples.
