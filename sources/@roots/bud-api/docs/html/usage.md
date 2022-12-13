---
title: Usage
---

**bud.html** can be called without passing any options.

```typescript title='bud.config.mjs'
export default async bud => {
  bud.html()
}
```

The default template will source a couple variables from `.env`; you'll want to make sure they are set.

```env title='.env'
PUBLIC_APP_TITLE='My App'
PUBLIC_APP_DESCRIPTION='My App Description'
```

## Customization

You can customize the generated HTML using an options object. It [accepts everything `HTMLWebpackPlugin` does](https://github.com/jantimon/html-webpack-plugin#options).

```typescript title='bud.config.mjs'
export default async bud => {
  bud.html({
    title: 'My App',
    meta: {
      viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
    },
    template: bud.path(`public/index.html`),
    minify: false,
    inject: false,
  })
}
```

### Using a custom template

The path to this file will be resolved relative to the project root:

```typescript title='bud.config.mjs'
export default async bud => {
  bud.html({
    template: 'index.html',
  })
}
```

Define your template as an absolute path if this doesn't work for you:

```typescript title='bud.config.mjs'
export default async bud => {
  bud.html({
    template: bud.path(`public/index.html`),
  })
}
```

### Defining template variables

Add template variables using `replace`.

```typescript {2-6} title='bud.config.js'
export default async bud => {
  bud.html({
    template: bud.path(`public/index.html`),
    replace: {VARIABLE: `value`},
  })
}
```

You may use any of these variables in the template by surrounding the variable name with `%` characters.

```html title='public/index.html'
<html>
  <title>%VARIABLE%</title>
</html>
```
