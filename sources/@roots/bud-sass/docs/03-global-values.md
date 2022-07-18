Use the `bud.sass.registerGlobal` function to ensure global styles are made available throughout your sass stylesheets, regardless of scope.

This function differs from `bud.sass.importGlobal` in that it can be passed arbitrary values.

```ts
bud.sass.registerGlobal('$foo: rgba(0, 0, 0, 1);')
```

If you want to divide these values up using an array, you may do so.

```ts
bud.sass.registerGlobal([
  '$foo: rgba(0, 0, 0, 1);',
  '$bar: rgba(255, 255, 255, 1);',
])
```
