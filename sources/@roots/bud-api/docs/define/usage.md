---
title: Usage
---

Call **bud.define** and pass your definitions.

```ts title=bud.config.js
bud.define({
  APP_NAME: 'My Application',
})
```

Any instances of `APP_NAME` in your application code will be replaced with `My Application`.

```ts title='src/app.js'
console.log(APP_NAME)
```

Replacements will also be made when compiling [html templates](/reference/bud.html).

```html title='public/index.html'
<html>
  <title>%APP_NAME%</title>
  <!-- ... -->
</html>
```

## Caveats

This replacement is static and happens at build time. It is not the same as a runtime variable.

Doing things like attempting to reassign its value in your application code will not work.
