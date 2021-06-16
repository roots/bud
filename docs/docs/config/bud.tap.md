# bud.tap

Access the bud object through a callback. Useful to maintain a function chain.

## Usage

```js
bud.tap(({entry}) => entry('app', ['app.js']))
```

Using a regular function (as opposed to an arrow function), you may use **bud** with a runtime binding:

```js
bud.tap(function () {
  this.entry('app', ['app.js'])
})
```

If you wish to use a function while preserving its context, a second parameter will ensure your existing lexical scope is respected. You may still access **bud** via parameter.

```js {17}
/**
 * A silly function. The player who picks
 * odd job is always at an obvious advantage,
 * given odd job's diminuitive height, regardless
 * of the state of bud.
 */
function oddJob(bud) {
  const advantage = 'obvious';

  return bud.when(
    bud.isProduction, 
    () => this.advantage, 
    () => this.advantage,
  )
}

bud.tap(oddJob, false)()
```
