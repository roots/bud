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

Now, in any module in our application, we can invoke jQuery with `$`. There is no need to import it.

```js
$('#modal') // it just works
```

However, it is common to have parts of your application using `jQuery`
in addition to `$`.

Handily, you can use an array to handle this.

```js
bud.provide({
  jquery: ['jQuery', '$'],
})
```
