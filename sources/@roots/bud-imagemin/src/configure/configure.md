Use **bud.imagemin.configure** to customize [image-minimizer-webpack-plugin](https://github.com/webpack-contrib/image-minimizer-webpack-plugin) options:

### Usage

When using two parameters, you are implicitly operating on the `minimizer` property.

**Using a simple object**

```typescript title="bud.config.mjs"
export default async bud => {
  const minimizer = {options: {encodeOptions: {}}}

  bud.imagemin.configure(`squoosh`, minimizer)
}
```

**Using a callback function**

```typescript title="bud.config.mjs"
export default async bud => {
  const callback = minimizer => ({
    ...minimizer,
    /* overload */
  })

  bud.imagemin.configure(`squoosh`, callback)
}
```

You may use three parameters to modify other options beyond `minimizer`:

```typescript title="bud.config.mjs"
export default async bud => {
  const key = `include`
  const value = /\/includes/

  bud.imagemin.configure(`squoosh`, key, value)
}
```

You can use dot syntax when specifying the `key` parameter:

```typescript title="bud.config.mjs"
export default async bud => {
  bud.imagemin.configure(
    `squoosh`,
    `minimizer.options.encodeOptions.mozjpeg`,
    {
      quality: 50,
    },
  )
}
```
