# bud.get

A utility for multi-compiler builds. **bud.get** allows you to reference a named compiler. 

## Usage

Get a compiler:

```js title='bud.config.js'
module.exports = bud => 
  bud.get('compiler-name')
```

Once you have a compiler instance you can continue chaining off it.

```js title='bud.config.js'
module.exports = bud => 
  bud
    .get('compiler-name')
    .entry({
      main: ['index.js'],
    })
```

The parent compiler is accessible using `global` or `parent`.

```js title='bud.config.js'
module.exports = bud => 
  bud
    /**
     * Configuring child compiler
     */
    .get('child-compiler')
      .entry({
        child: ['index.js'],
      })

    /**
     * Configuring parent compiler
     */
    .get('global')
      .entry({
        'parent-main': ['parent.js'],
      })
```

## Related

| Utility | Description |
| ---     | ---   |
| [bud.make](/docs/bud.make) | Create a child compiler |
