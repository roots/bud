# bud.make

Create a new individually configurable instance of bud.

## Usage

**bud.make** takes two parameters:

- The **name** of the new compiler
- An optional callback to use for configuring the compiler.

```js
bud.make('scripts', child => 
  child.entry('app', 'app.js')
)
```

This function returns the parent bud instance for further chaining. It is also possible to reference the parent instance using `bud.parent`.

```js
bud.make('scripts', child => {
  child.entry('app', 'app.js')
  child.parent.dev({ 
      // ... 
    })

  return child
})
```

Likewise, a child compiler can also be tapped into again later using `bud.get`

```js
bud.get('scripts').hash()
```