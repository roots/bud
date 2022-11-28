---
title: Configuration
---

### bud.critical.src

Specify the source with a URL:

```typescript title="bud.config.mjs"
bud.critical.src(`http://example.test`)
```

Specify the source with a local filepath:

```typescript title="bud.config.mjs"
bud.critical.src(bud.path(`@src`, `template.html`))
```

### bud.critical.html

Specify the markup directly

```typescript title="bud.config.mjs"
bud.critical.html(`<html>...</html>`)
```

### bud.critical.width

Specify the width of the browser viewport

```typescript title="bud.config.mjs"
bud.critical.width(1920)
```

### bud.critical.height

Specify the height of the browser viewport

```typescript title="bud.config.mjs"
bud.critical.height(1080)
```

### bud.critical.extract

Extract critical css from its source file. Extraction is enabled by default but can be disabled by passing `false`.

```typescript title="bud.config.mjs"
bud.critical.extract(false)
```

### bud.critical.ignore

Ignore certain CSS rules or declarations.

```typescript title="bud.config.mjs"
bud.critical.ignore({
  decl: [/^transition/],
  rule: [/^@font-face/],
})
```

### bud.critical.enable

Enable or disable the extension.

It accepts an optional boolean argument. If no argument is provided, the extension will be enabled.

```typescript title="bud.config.mjs"
bud.critical.enable()
```
