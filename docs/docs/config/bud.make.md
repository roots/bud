# bud.make

Create a child compiler.

## Usage

Create a new individually configurable instance of bud.

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