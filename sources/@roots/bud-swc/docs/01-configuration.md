---
title: Configuration
---

### .swcrc

Including a `.swcrc` config file in the root of your project will replace all default options.

Be aware that extensions may still modify the options even if you use `.swcrc`. For example, [@roots/bud-react](https://bud.js.org/extensions/bud-react) will modify the `jsc.transform` option to support react refresh if `bud.react.refresh` is enabled.

### API

You can modify swc options directly using `bud.swc`. These options are passed in more or less directly to swc-loader.

```ts
bud.swc.set(`jsc.parser.dynamicImport`, false)
```

```ts
bud.swc.setOptions(options => ({
  ...options,
  jsc: {
    ...(options?.jsc ?? {}),
    parser: {
      ...(options?.jsc?.parser ?? {}),
      dynamicImports: false,
    }
  }
}))
```
