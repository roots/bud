# bud.entry

By default **bud** compiles **src/index.js** to **dist/main.js**.

This function allows you to modify this behavior.

## Usage

The simplest usage is just a name for the entrypoint and the asset to compile

```js
bud.entry('app', 'app.js')
```

It is also possible to pass an array of assets. Assets do not have to be the same filetype to be grouped together as a single entrypoint.

```js
bud.entry('app', ['app.js', 'app.css'])
```

You may specify multiple entrypoints in one call using object syntax

```js
bud.entry({
  app: ['app.js', 'app.css'],
  admin: ['admin.js', 'admin.css'],
})
```

## Specifying dependencies

Bud supports the new Webpack 5 `dependOn` syntax for explicitly defining entrypoint dependencies.

Example react application:

```ts
bud.entry({
  react: ['react', 'react-dom'],
  app: {
    import: ['app.js', 'app.css'],
    dependOn: ['react'],
  },
})
```

## Hooks

You may also specify entrypoints using the `build/entry` hook.

```js
bud.hooks.on('build/entry', {
  app: ['app.js', 'app.css'],
  admin: ['admin.js', 'admin.css'],
})
```

This will completely override whatever is defined. If you want to augment the existing definition you can do so with spread syntax.

```js
bud.hooks.on('build/entry', entrypoints => ({
  ...entrypoints,
  app: ['app.js', 'app.css'],
  admin: ['admin.js', 'admin.css'],
})
```
