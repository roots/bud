# bud.make

Create a new, configurable instance of Bud.

For more context on how this might be useful check out [the guide on multi-compiler configurations](/guides/advanced/multi-compiler).

## Usage

**bud.make** takes two parameters:

- The **name** of the new compiler
- An optional callback to use for configuring the compiler.

```js
bud.make('scripts', child => child.entry('app', 'app.js'))
```

This function returns the parent bud instance for further chaining. 

It is also possible to reference the parent instance using `bud.parent`.

```js
bud.make('scripts', child => {
  child.entry('app', 'app.js')
  child.parent.dev({
    // ...
  })

  return child
})
```

Related:

- [bud.get](/docs/bud.get)
