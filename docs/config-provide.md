---
description: Make a module available globally.
---

# bud.provide

This function makes a variable/module available throughout the entire application
without needing to import it explicitly.

## Usage

This specifies that `$` is the default `jQuery` export:

```js
bud.provide({
  jquery: '$',
})
```

Now, in any module in our application, we can just use `$`
whenever we want to use `jQuery`.

There is no need to `import` anything from `'jquery'`.

```js
$('#modal') // it just works
```

However, it is common to have parts of your application using `jQuery`
in addition to `$`.

Handily, you can use an array to provide a module in multiple variables.

```js
bud.provide({
  jquery: ['jQuery', '$'],
})
```

## Signature

```ts
function ({
  [key: string]: string | string[]
}): Bud
```
