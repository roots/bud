Use **bud.imagemin.encode** to set the encoder options for a given filetype.

### Usage

```typescript title="bud.config.mjs"
export default async bud => {
  bud.imagemin.encode(`jpg`, {quality: 50})
}
```

### Encoder keys

Some of the squoosh encoders have a name that does not match the filetype. For example, the `mozjpeg` encoder is used to encode `jpg` files.

You can use either `jpg`, `mozjpeg`, or `jpeg` as the key. The extension will handle the mapping for you.
