# bud.tap

Access the bud object through a callback. Useful to maintain a function chain.

## Usage

```js
bud.tap(({entry}) => entry('app', ['app.js']))
```

Using a regular function (as opposed to an arrow function), you may use **bud** using a contextual binding:

```js
bud.tap(function () {
  this.entry('app', ['app.js'])
})
```

If you wish to use a non-arrow function while preserving its context, a second parameter will ensure your existing lexical scope is respected. You may still access **bud** via parameter.

```js
bud.tap(function (bud) {
  bud.entry('app', ['app.js'])
}, false)
```
