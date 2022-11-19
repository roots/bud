### Adding generators

You may add additional generators using `bud.imagemin.setGenerator`.

For example, this custom generator will convert an asset to `png` at 80% quality.

```typescript title="bud.config.mjs"
export default async bud => {
  const encodeOptions = {oxipng: {quality: 80}}

  bud.imagemin.setGenerator(`png`, {
    options: {encodeOptions},
  })
}
```

Once set, it can be called using `?as=png` from application scripts and styles.

### Operating on generators directly

You may access the generator map directly using **bud.imagemin.generators**

```typescript title="bud.config.mjs"
export default async bud => {
  bud.imagemin.generators.clear()
}
```
