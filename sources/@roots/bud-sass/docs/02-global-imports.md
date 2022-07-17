Use the `bud.sass.importGlobal` function to ensure a module is made available throughout your sass stylesheets, regardless of scope.

```ts
bud.sass.importGlobal('@src/styles/variables')
```

If you have more than one stylesheet to import, you may use an array:

```ts
bud.sass.importGlobal([
  '@src/styles/variables',
  '@src/styles/mixins',
  '@src/styles/functions',
])
```
