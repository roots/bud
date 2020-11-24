---
description: Extending Bud
---

## Adding an extension

First, install the extension.

Once installed, [bud.use](config-use.md) is used to register the extension with Bud.

```js
bud.use(['@roots/bud-sass'])
```

## Configuring an extension

Some extensions may add additional configuration functions to the `bud` object. Refer to the extension documentation for possible details.

## First-party extensions

| Name                           | Description                     | Usage                                                                                                |
| ------------------------------ | ------------------------------- | ---------------------------------------------------------------------------------------------------- |
| @roots/bud-babel               | Adds babel support.             | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-babel/README.md)               |
| @roots/bud-eslint              | Adds eslint support.            | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-eslint/README.md)              |
| @roots/bud-wordpress-manifests | WP specific build tooling.      | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-wordpress-manifests/README.md) |
| @roots/bud-purgecss            | Adds purgecss support.          | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-purgecss/README.md)            |
| @roots/bud-react               | Adds react support.             | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-react/README.md)               |
| @roots/bud-sass                | Adds sass preprocessor support. | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-sass/README.md)                |
| @roots/bud-stylelint           | Adds stylelint support.         | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-stylelint/README.md)           |
| @roots/bud-tailwindcss         | Adds tailwindcss support.       | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-tailwindcss/README.md)         |
| @roots/bud-typescript          | Adds typescript support.        | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-typescript/README.md)          |
| @roots/bud-vue                 | Adds Vue framework support.     | [Usage ↗](https://github.com/roots/bud/tree/stable/packages/extension-vue/README.md)                 |