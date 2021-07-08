# bud.define

Define variables during configuration which will be made available to bundled code.

## Usage

Define a value:

```ts
bud.define({
  APP_NAME: 'My Application',
})
```

Use them in application code:

```ts
const {APP_NAME} = window
```

Use them in [an html template](/docs/bud.template):

```html
<html>
  <title>%APP_NAME%</title>
  <!-- ... -->
</html>
```
