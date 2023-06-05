---
title: configuration
---

You can configure Stylelint in two ways:

- [Using a stylelint config file](#using-a-stylelint-config-file)
- [Employing the `bud.stylelint` API](#configuring-stylelint-with-budstylelint)

### Using a stylelint config file

You can configure stylelint [using a stylelint config file](https://stylelint.io/user-guide/configure).

bud.js allows for you to write your stylelint config in CommonJS, ESM, TypeScript, JSON or YML. This file should be placed in the root of your project or the project `./config` directory.

```js title=stylelint.config.js
export default {
  extends: [`@roots/bud-stylelint/config`],
  rules: {'no-descending-specificity': null},
}
```

### Configuring stylelint with `bud.stylelint`

You can configure stylelint directly in `bud.config.js` using the `bud.stylelint` API.

```ts title=bud.config.js
bud.stylelint
  .extends([`@roots/bud-stylelint/config`])
  .setRules({'no-descending-specificity': null})
  .setFailOnError(bud.isProduction)
  .setFailOnWarning(false)
  .setFix(true)
```

### Extends

You can extend a stylelint config by passing an array of stylelint config files to `bud.stylelint.extends`.

```ts title=bud.config.js
bud.stylelint.extends([`@roots/bud-stylelint/config`])
```

### Rules

You can set stylelint rules by passing an object to `bud.stylelint.setRules`.

```ts title=bud.config.js
bud.stylelint.setRules({'no-descending-specificity': null})
```

### Fail on error

By default, stylelint will fail on error in production mode. You can change this behavior by setting
`bud.stylelint.failOnError` to `false`.

```ts title=bud.config.js
bud.stylelint.setFailOnError(false)
```

### Fail on warning

By default, stylelint will not fail on warning. You can change this behavior by setting
`bud.stylelint.failOnWarning` to `true`.

```ts title=bud.config.js
bud.stylelint.setFailOnWarning(true)
```

### Fix

By default, stylelint will not fix errors. You can change this behavior by setting
`bud.stylelint.fix` to `true`.

```ts title=bud.config.js
bud.stylelint.setFix(true)
```

### Stylelint path

By default, bud.js will use the stylelint version installed in your project if it is installed. Otherwise it will fallback to the version included with the extension.
You can specify an explicit path to the stylelint binary by setting `bud.stylelint.stylelintPath`.

```ts title=bud.config.js
bud.stylelint.setStylelintPath('/path/to/stylelint')
```
