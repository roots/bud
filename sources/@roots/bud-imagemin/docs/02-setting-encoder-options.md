You may wish to customize the encoder settings. This is done with [bud.imagemin.encode](https://bud.js.org/extensions/bud-imagemin/encode).

```typescript title="bud.config.mjs"
export default async bud => {
  bud.imagemin.encode(`jpg`, {quality: 50})
}
```

Some of the default squoosh encoders have a name that does not match the filetype. For example, the `mozjpeg` encoder is used to encode `jpg` files.

When setting the encoder options the function will automatically map filetypes to the encoder name for you.

### Mapping new encoders

If you are adding [support for a new minimizer](#minimizers), you may want to add to the encoder map or modify existing map entries.

You can do that with the **bud.imagemin.encoders** map object:

```typescript title="bud.config.mjs"
export default async bud => {
  bud.imagemin.encoders.set(`png`, [`squoosh`, `oxipng`])
}
```

This allows [bud.imagemin.encode](https://bud.js.org/extensions/bud-imagemin/encode) to work with the new minimizer.
