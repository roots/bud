---
title: Usage
---

**bud.html** can be called to generate an HTML skeleton for your web application.

```ts title=bud.config.ts
export default async bud => {
  bud.html()
}
```

The default template will source a couple variables from `.env`; you'll want to make sure they are set.

```env title=.env
PUBLIC_APP_TITLE='My App'
PUBLIC_APP_DESCRIPTION='My App Description'
```

## Customization

You can customize the generated HTML using an options object. It [accepts everything `HTMLWebpackPlugin` does](https://github.com/jantimon/html-webpack-plugin#options).

```ts title=bud.config.ts
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

You can use a custom HTML template by passing the path to **bud.html**. If the given path is relative it will be resolved against the project base directory.

```ts title=bud.config.ts
export default async bud => {
  bud.html(`index.html`)
}
```

Alternatively, you can use the `template` option as part of an options object:

```ts title=bud.config.ts
export default async bud => {
  bud.html({
    template: 'index.html',
  })
}
```

Define your template as an absolute path if it exists outside the project:

```ts title=bud.config.ts
export default async bud => {
  bud.html({
    template: `/code/shared/template.html`,
  })
}
```

### Defining template variables

Add template variables using `replace`.

```ts {2-6} title=bud.config.ts
export default async bud => {
  bud.html({
    template: bud.path(`public/index.html`),
    replace: {
      VARIABLE: `value`
    },
  })
}
```

You may use any of these variables in the template by surrounding the variable name with `%` characters.

```html title=public/index.html
<html>
  <title>%VARIABLE%</title>
</html>
```
