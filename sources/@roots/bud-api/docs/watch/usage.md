---
title: Usage
---

It is preferred to specify files using [bud.path](/docs/bud.path) or [bud.glob](/docs/bud.glob).

```typescript
bud.watch(bud.path(`@src/pages/page.php`))
```

You can use glob syntax to specify multiple files using pattern matching:

```typescript
bud.watch(bud.path(`@src/pages/**/*`))
```

You can add additional watch patterns using an `array`:

```typescript
bud.watch([bud.path('@src/pages/**/*'), bud.path('package.json')])
```
