---
title: Usage
---

To specify that `$` is the default `jquery` export:

```js
bud.provide({
  jquery: '$',
})
```

Now, in any module in our application, the `jquery` module can be referenced using `$`. There is no need to import it.

```js
$(`#modal`) // it just works
```

If you have have more than one token referring to the same module, use an array:

```js
bud.provide({
  jquery: ['$', 'jQuery'],
})
```
