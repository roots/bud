# bud.provide

This function makes a variable/module available throughout the entire application.

## Usage

The following specifies that `$` is the default `jQuery` export:

```js
bud.provide({
  jquery: "$",
});
```

Now, in any module in our application, we can invoke jQuery with `$`. There is no need to import it.

```js
$("#modal"); // it just works
```
