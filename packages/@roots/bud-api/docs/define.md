# bud.define

Define variables during configuration which will be made available to bundled code.

## Usage

Define a value:

```ts
bud.define({
  APP_NAME: "My Application",
});
```

Use them in application code:

```ts
const { APP_NAME } = window;
```

Use them in [templates](https://github.com/roots/bud/tree/stable/docs/config/template.md):

```html
<html>
  <title>%APP_NAME%</title>
  <!-- ... -->
</html>
```
