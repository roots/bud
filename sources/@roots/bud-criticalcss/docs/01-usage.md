---
title: Usage
---

1. [Identify the markup to be used for critical css generation](#identify-source-markup)
2. [Enable the extension](#enable-the-extension)

### Identify source markup

You may use [bud.critical.src](#budcriticalsrc) to specify a URL or a path on disk to the markup that will be used to generate critical styles.

```typescript title="bud.config.mjs"
bud.critical.src(`http://example.test`)
```

```typescript title="bud.config.mjs"
bud.critical.src(bud.path('path/to/index.html'))
```

Or, you may use [bud.critical.html](#budcriticalhtml) to provide the markup directly.

```typescript title="bud.config.mjs"
bud.critical.html(`<html>...</html>`)
```

### Enable the extension

You must explicitly call [bud.critical.enable](#budcriticalenable) to enable the extension.

```typescript title="bud.config.mjs"
bud.critical.enable()
```
