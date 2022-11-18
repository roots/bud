### Encoder

You can set options for an encoder with `bud.imagemin.encode`:

```ts
export default async bud => {
  bud.imagemin
    /**
     * Set encoder options:
     * - 'jpg' will be interpolated to 'mozjpeg'
     * - 'png' will be interpolated to 'oxipng'
     */
    .encode('jpg', {quality: 50})
    .encode('png', {quality: 90})
}
```

Available encoders:

| encoder | extension |
| ------- | --------- |
| mozjpeg | `.jpg`    |
| webp    | `.webp`   |
| avif    | `.avif`   |
| jxl     | `.jxl`    |
| wp2     | `.wp2`    |
| oxipng  | `.png`    |

### setEncodeOptions

You can fully override the encoder config using `bud.imagemin.setEncodeOptions`.

Options are expressed as a `Map`:

```ts
const options = new Map([
  ['mozjpeg', {quality: 50}],
  ['oxipng', 'auto'],
  ['webp', {}],
])

export default async bud => {
  bud.imagemin.setEncodeOptions(options)
}
```

## Implementation

You can replace `libSquoosh` with another implementation using `bud.imagemin.setEncoder`:

```ts
export default async bud => {
  bud.imagemin.setEncoder(SomeEncoder)
}
```

## Generator

You can replace the `libSquoosh` generator with another implementation using `imagemin.setGenerator`:

```ts
export default async bud => {
  bud.imagemin.setGenerator(SomeGenerator)
}
```
