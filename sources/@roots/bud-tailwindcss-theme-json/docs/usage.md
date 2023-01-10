---
title: Usage
---


### wpjson.useTailwindColors()

Convert `theme.colors` to a `theme.json` palette.

```ts title="bud.config.mjs"
bud.wpjson.useTailwindColors().enable()
```

### wpjson.useTailwindFontSize()

Emits values from `theme.fontSize` as the `typography.fontSizes` property of `theme.json`.

```ts title="bud.config.mjs"
bud.wpjson.useTailwindFontSize().enable()
```

### wpjson.useTailwindFontFamily()

Emits values from `theme.fontFamily` as the `typography.fontFamilies` property of `theme.json`.

```ts title="bud.config.mjs"
bud.wpjson.useTailwindFontFamily().enable()
```

### Limiting values to those defined in `theme.extend`

You can pass `true` to any of the the above functions to limit the values emitted to those defined under tailwind's `theme.extend` key.

```ts title="bud.config.mjs"
bud.wpjson.useTailwindColors(true).enable()
```

### In combination

You can use any of these methods in combination:

```ts title="bud.config.mjs"
bud.wpjson
  .useTailwindColors()
  .useTailwindFontSize()
  .useTailwindFontFamily()
  .enable()
```
