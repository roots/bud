---
title: Usage
---

You can manage [WordPress' `theme.json` config file](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/) from the context of your bud config using **bud.wpjson**.

If you are using this with the [@roots/bud-preset-wordpress](https://bud.js.org/extensions/bud-preset-wordpress) or [@roots/sage](https://bud.js.org/extensions/sage) preset you can also access the class using **bud.wp.json**.

### Enabling `theme.json` support

In order to emit the file you will need to enable the feature:

```ts title=bud.config.ts
bud.wpjson.enable()
```

### Managing generic `theme.json` values

You can use `setOption` from the bud.js extensions API to set `theme.json` values:

```ts title=bud.config.ts
bud.wpjson.setOption('customTemplates', []).enable()
```

### Managing the `settings` field

Most `theme.json` configuration centers around the `settings` property. You can modify these values using a fluent
container interface exposed by `bud.wpjson.settings`.

```ts title=bud.config.ts
bud.wpjson
  .settings(theme =>
    theme
      .set('typography.customFontSizes', true)
      .set('typography.fontWeight', false)
      .merge('spacing.units', ['px', '%', 'em']),
  )
  .enable()
```

### Using tailwindcss config values

If you use [@roots/bud-tailwindcss](https://bud.js.org/extensions/bud-tailwindcss) in your project there are several
opt-in config functions that allow you to generate `theme.json` values directly from your tailwind config.

#### wp.json.useTailwindColors()

Convert `theme.colors` to a `theme.json` palette.

```ts title=bud.config.ts
bud.wpjson.useTailwindColors()
```

#### wp.json.useTailwindFontSize()

Emits values from `theme.fontSize` as the `typography.fontSizes` property of `theme.json`.

```ts title=bud.config.ts
bud.wpjson.useTailwindFontSize()
```

#### wp.json.useTailwindFontFamily()

Emits values from `theme.fontFamily` as the `typography.fontFamilies` property of `theme.json`.

```ts title=bud.config.ts
bud.wpjson.useTailwindFontFamily()
```

### wp.json.useTailwindSpacing()

Emits values from `theme.spacing` as the `spacing` property of `theme.json`.

```ts title=bud.config.ts
bud.wpjson.useTailwindFontFamily()
```

#### Limiting values to those defined in `theme.extend`

You can pass `'extend'` to any of the the tailwind helper functions to limit the values emitted to those defined under tailwind's `theme.extend` key.

```ts title=bud.config.ts
bud.wpjson.useTailwindColors(`extend`)
```

### In combination

You can use these methods in combination:

```ts title=bud.config.ts
bud.wpjson
  .useTailwindColors()
  .useTailwindFontSize()
  .useTailwindFontFamily()
  .setOption('typography.fontWeight', false)
```
