**@roots/bud-imagemin** is a simple wrapper around the [webpack-contrib/image-minimizer-webpack-plugin](https://github.com/webpack-contrib/image-minimizer-webpack-plugin). Refer to their [documentation](https://github.com/webpack-contrib/image-minimizer-webpack-plugin) for more information on how these features are used.

### Adding minimizers

You can add support for other minimizers beyond the included default using **bud.imagemin.setMinimizer**.

```typescript title="bud.config.mjs"
import MinimizerFunction from 'minimizer-lib'

export default async bud => {
  bud.imagemin.setMinimizer(`minimizer-lib`, {
    minimizer: {
      implementation: MinimizerFunction,
      options: {
        encodeOptions: {},
      },
    },
  })
}
```

### Modifying minimizers

You can use **bud.imagemin.configure** to customize the options for a minimizer that already exists.

```typescript title="bud.config.mjs"
export default async bud => {
  bud.imagemin.configure(`squoosh`, {
    options: {
      encodeOptions: {},
    },
  })
}
```

It also accepts a callback function.

```typescript title="bud.config.mjs"
export default async bud => {
  bud.imagemin.configure(`squoosh`, config => ({
    ...config,
    options: {...config.options,
      encodeOptions: {
        mozjpeg: {quality: 50},
      },
    },
  })
}
```

If needed, you may call **bud.imagemin.configure** with three parameters to modify other options.

```typescript title="bud.config.mjs"
export default async bud => {
  const minimizer = `squoosh`
  const optionKey = `include`
  const value = /\/includes/

  bud.imagemin.configure(minimizer, optionKey, value)
}
```

In this case, a callback is also supported in the third parameter.

### Operating on minimizers directly

You may access the minimizer map directly using **bud.imagemin.minimizers**

```typescript title="bud.config.mjs"
export default async bud => {
  bud.imagemin.minimizers.clear()
}
```
