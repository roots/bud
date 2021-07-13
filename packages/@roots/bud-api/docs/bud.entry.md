# bud.entry

By default **bud** compiles **src/index.js** to **dist/main.js**.

This function allows you to modify this behavior.

## Usage

The simplest usage is just a name for the entrypoint and the asset to compile

```js title='bud.config.js'
bud.entry('app', 'app.js')
```

It is also possible to pass an array of assets. Assets do not have to be the same filetype to be grouped together as a single entrypoint.

```js title='bud.config.js'
bud.entry('app', ['app.js', 'app.css'])
```

You may specify multiple entrypoints in one call using object syntax

```js title='bud.config.js'
bud.entry({
  app: ['app.js', 'app.css'],
  admin: ['admin.js', 'admin.css'],
})
```

## Specifying dependencies

Bud supports the new Webpack 5 `dependOn` syntax for explicitly defining entrypoint dependencies.

Example react application:

```ts title='bud.config.js'
bud.entry({
  react: ['react', 'react-dom'],
  app: {
    import: ['app.js', 'app.css'],
    dependOn: ['react'],
  },
})
```

## Globbing

You can specify assets using [fast-glob syntax](https://git.io/JkGbw).

- `*` matches any number of characters, but not `/`
- `?` matches a single character, but not `/`
- `**` matches any number of characters, including `/`, as long as it's the only thing in a path part
- `{}` allows for a comma-separated list  of "or" expressions
- `!` at the beginning of a pattern will negate the match


## Specifying entrypoints with hooks

You may also specify entrypoints using the `build/entry` [hook](/docs/bud.hooks/index).

```js title='bud.config.js'
bud.hooks.on('build/entry', {
  app: ['app.js', 'app.css'],
  admin: ['admin.js', 'admin.css'],
})
```

This will completely override whatever is defined. If you want to augment the existing definition you can do so with spread syntax.

```js title='bud.config.js'
bud.hooks.on('build/entry', entrypoints => ({
  ...entrypoints,
  app: ['app.js', 'app.css'],
  admin: ['admin.js', 'admin.css'],
})
```
