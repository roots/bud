---
title: Usage
---

Enable minification:

```js
bud.minimize()
```

Disable minification:

```js
bud.minimize(false)
```

Use a string or array of strings to enable or disable particular handlers. Possible values: `css`, `js`.

```js
bud.minimize(`css`)
```

```js
bud.minimize([`css`, `js`])
```
