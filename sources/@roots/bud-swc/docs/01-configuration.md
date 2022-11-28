---
title: Configuration
---

You have two options for configuring SWC:

### bud.swc

You may use `bud.swc` api in your bud configuration file:

```ts
bud.swc.setOptions({
  jsc: {
    // ...,
  },
})
```

### .swcrc

You may also use a standard `.swcrc` config file in the root of your project.
