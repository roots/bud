# bud.define

[**bud.define**](/docs/bud.define) is used to make values defined in your config available throughout your application.

## Signature

```ts title='bud.define.d.ts'
type Define = (
  this: Framework
  values: Webpack.DefinePlugin["definitions"]
) => Framework
```

## Usage

In your config file, call **bud.define** and pass your definitions.

```js title='bud.config.js'
bud.define({
  APP_NAME: 'My Application',
})
```

Once defined, you can use them in your application.

```ts title='src/app.js'
const {APP_NAME} = window
```

They will also be made available to [any html templates](/docs/bud.template).

```html title='public/index.html'
<html>
  <title>%APP_NAME%</title>
  <!-- ... -->
</html>
```
