---
description: Perform a chain of operations.
---

# bud.pipe

Pass a chain of function to be executed in sequence.

## Usage

```js
bud.pipe([
  ({gzip}) => gzip(),
  ({minify}) => minify(),
  ({define}) => define({foo: 'bar'}),
  ({run}) => run(),
])
```

It's well suited for chaining function calls in various contexts.

```js
bud
  .entry('app', ['app.js', 'app.css'])
  .define({foo: 'app'})
  .when(
    bud.mode.is('development'),
    bud =>
      bud.pipe([
        ({dev}) => dev({host: 'localhost', port: 3000}),
        ({library}) => library(['react', 'react-dom']),
      ]),
    bud =>
      bud.pipe([
        ({gzip}) => gzip(),
        ({hash}) => hash(),
        ({minify}) => minify(),
      ]),
  )
  .run()
```

## Signature

```ts
type Pipe<T = Bud.Contract> = (
  this: T,
  fns: ((bud: T) => T)[],
) => T
```

## Returns

`Framework.Bud`: The Bud instance
