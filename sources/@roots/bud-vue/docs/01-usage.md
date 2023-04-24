---
title: Usage
---

Once installed, vue should be ready to use in your project. The extension is pre-configured to support Vue 3 single file components (runtime only).

## Disabling runtime only

You can disable the `runtimeOnly` default by adding the following to your config:

```js
export default async bud => {
  bud.vue.set(`runtimeOnly` false)
}
```

This method returns `bud.vue`, not `bud`. You cannot chain bud configuration calls on it.
