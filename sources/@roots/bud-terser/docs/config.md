---
Title: Configuration
---

The extension requires zero configuration, but you can customize its options if needed.

Here are some configuration examples for different use cases:

### Remove console.log statements and comments from the production build

```typescript
export default async bud => {
  bud.terser.dropConsole().dropComments()
}
```

### Keep comments in the minified output

```typescript
export default async bud => {
  bud.terser.dropComments(false)
}
```

### Disable mangling of variable names

```typescript
export default async bud => {
  bud.terser.set('terserOptions.mangle', false)
}
```

### Customize compression options

```typescript
export default async bud => {
  bud.terser.set('terserOptions.compress', {
    drop_console: true,
    drop_debugger: false,
    defaults: true,
    unused: true,
  })
}
```

### Use a custom regular expression for inclusion/exclusion of files

```typescript
export default async bud => {
  bud.terser.set('include', /src\/js\/.*\.js$/)
  bud.terser.set('exclude', /node_modules/)
}
```

To apply any of these configurations, add the respective code snippet to your bud.config.js file.
