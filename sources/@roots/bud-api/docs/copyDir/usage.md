---
title: Usage
---

All paths are relative to `@src`. This can be changed with [the `context` parameter](#changing-context).

### Copying a directory

Copy `@src/images` to `@dist/images`:

```typescript title=bud.config.js
bud.copyDir(`images`)
```

### Modifying the output path

Copy `@src/images` to `@dist/example`.

```typescript title=bud.config.js
bud.copyDir([`images`, `example`])
```

### Changing context

Without specifying anything all paths are relative to `@src`.

You can pass a second parameter to change the context.

Copy `vendor/images` to `@dist/images`:

```typescript title=bud.config.js
bud.copyDir(`images`, `vendor`)
```

### Changing options

Any of the underlying options can be dialed in with an optional third parameter.

Copy from `@src/fonts` to `@dist/vendor/fonts` and include dotfiles:

```typescript title=bud.config.js
bud.copyDir(`fonts`, `vendor/fonts`, {
  globOptions: {dot: true},
})
```
