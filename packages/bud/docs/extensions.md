---
description: Install extensions to meet your unique project needs.
---

# Extensions

Bud includes support for extending the framework with optional functionality.

### Usage

Plugins are registered using `bud.extend` method. Plugins will be called in
the provided order.

```js
bud.extend([require('@roots/bud-eslint')])
```

Some plugins may attach additional configuration methods to the `bud` object
for you to utilize.

Obviously, you can't call a plugin-provided method without first registering the
 plugin that provides it.

```js
bud.extend([require('@roots/bud-purgecss').plugin]).purgecss({
  /** purgecss configuration */
})
```

Some extensions may provide additional configuration methods. Obviously, you
can't call an extension-provided method without first registering that
extension, which is one of the reasons it's generally a good idea to import and
register everything at the top of your config.

```js
bud.extend([dependencyExtraction]).dependencyExtraction({
  injectPolyfill: true,
})
```

### First-party plugins

There are a number of Roots maintained plugins available to kickstart your projects.

| Name                                            | Description                                                    | Usage                                   |
| ----------------------------------------------- | -------------------------------------------------------------- | --------------------------------------- |
| @roots/bud-dependency-extraction-webpack-plugin | Adds @wordpress/dependency-extraction-webpack-plugin support.  | [Usage ↗](bud-dependency-extraction.md) |
| @roots/bud-eslint                               | Adds eslint support.                                           | [Usage ↗](bud-eslint.md)                |
| @roots/bud-palette-webpack-plugin               | Adds palette-webpack-plugin support.                           | [Usage ↗](bud-palette-plugin.md)        |
| @roots/bud-purgecss                             | Adds purgecss support.                                         | [Usage ↗](bud-purgecss.md)              |
| @roots/bud-react                                | Adds react support.                                            | [Usage ↗](bud-react.md)                 |
| @roots/bud-sass                                 | Adds sass preprocessor support.                                | [Usage ↗](bud-sass.md)                  |
| @roots/bud-stylelint                            | Adds stylelint support.                                        | [Usage ↗](bud-stylelint.md)             |
| @roots/bud-tailwindcss                          | Adds tailwindcss support.                                      | [Usage ↗](bud-tailwindcss.md)           |
| @roots/bud-typescript                           | Adds typescript support.                                       | [Usage ↗](bud-typescript.md)            |
| @roots/bud-vue                                  | Adds Vue framework support.                                    | [Usage ↗](bud-vue.md)                   |
| @roots/bud-wordpress-manifests                  | Adds WordPress specific asset manifests for simpler enqueuing. | [Usage ↗](bud-wordpress-manifests.md)   |

