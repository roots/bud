---
title: Usage
---

You can manage [WordPress' `theme.json` config file](https://developer.wordpress.org/block-editor/how-to-guides/themes/theme-json/) from the context of your bud config using `bud.wptheme`.

### Enabling `theme.json` support

In order to emit the file you will need to enable the feature:

```ts title="bud.config.mjs"
bud.wpjson.enable()
```

### Managing generic `theme.json` values

You can use `setOption` from the bud.js extensions API to set `theme.json` values:

```ts title="bud.config.mjs"
bud.wpjson.setOption('customTemplates', []).enable()
```

### Managing the `settings` field

Most `theme.json` configuration centers around the `settings` property. You can modify these values using a fluent
container interface exposed by `bud.wpjson.settings`.

```ts title="bud.config.mjs"
bud.wptheme
  .settings(theme =>
    theme
      .set('typography.customFontSizes', true)
      .set('typography.fontWeight', false)
      .merge('spacing.units', ['px', '%', 'em']),
  )
  .enable()
```
