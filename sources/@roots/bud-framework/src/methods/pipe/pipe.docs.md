---
title: bud.pipe
description: Pipe a value through an array of functions. The return value of each callback is used as input for the next.
---

Pipe a value through an array of functions. The return value of each callback is used as input for the next.

## Usage

Pass an array of functions to be executed in sequence. Execution order is guaranteed even if the functions are async.

The output of each function will be used as input for the next.

```js title="bud.config.mjs"
export default async bud => {
  await bud.pipe([
    async bud => bud.log(`function 1`),
    async bud => bud.log(`function 2`),
  ])
}
```

You can pass an additional second parameter which will be used as an initial value.

If this parameter is not supplied the initial value will be the bud instance.

```js title="bud.config.mjs"
export default async bud => {
  await bud.pipe(
    [
      async v => `${v}!`, // `this in the initial value!`
      async v => `${v}!`, // `this is the initial value!!`
      async v => `${v}!`, // `this is the initial value!!!`
    ],
    `this is the initial value`,
  )
}
```
