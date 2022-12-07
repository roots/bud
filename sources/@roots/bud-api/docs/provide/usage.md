---
title: Usage
---

The following specifies that `$` is the default `jquery` export:

```js
bud.provide({jquery: '$'})
```

Now, in any module in our application, we can invoke `jquery` with `$`. There is no need to import it.

```js
$(`#modal`) // it just works
```

If you have multiple references to resolve against a module, you can specify them with an array:

```js
bud.provide({
  jquery: ['$', 'jQuery'],
})
```
