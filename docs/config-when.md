---
description: Do things when certain conditions are met.
---

# bud.when

Executes a function if a given test is `true`.

- The first parameter is the conditional check.
- The second parameter is the function to run if `true`.
- The third paramter is optional; executed if the conditional is not `true`.

## Usage

Only produce a vendor bundle when running in `production` mode:

```js
bud.when(bud.mode.is('production'), () => bud.vendor())
```

Use `eval` sourcemap in `development` and `hidden-source-map`in`production`.

```js
bud.when(
  bud.mode.is('development'),
  () => bud.devtool('eval'),
  () => bud.devtool('hidden-source-map'),
)
```

## Signature

```ts
function (
  testCase: boolean,
  trueCase: CallableFunction,
  falseCase?: CallableFunction | undefined,
): Bud
```

## Returns

`Framework.Bud`: The Bud instance
