---
title: Configuration
---

For general information on configuring eslint see [the official Eslint user guide](https://eslint.org/docs/user-guide/configuring).

You can configure Stylelint in two ways:

- [Using a eslint config file](#using-an-eslint-config-file)
- [Employing the `bud.eslint` API](#configuring-eslint-with-budeslint)

### Using an eslint config file

You can configure eslint [using a eslint config file](https://eslint.io/user-guide/configure).

bud.js allows for you to write your eslint config in CommonJS, ESM, TypeScript, JSON or YML. This file should be placed in the root of your project or the project `./config` directory.

```js title=eslint.config.js
export default {
  extends: [`@roots/bud-eslint/config`],
  rules: {'no-console': `error`},
}
```

### Configuring eslint with `bud.eslint`

You can configure eslint directly in `bud.config.js` using the `bud.eslint` API.

```ts title=bud.config.js
bud.eslint
  .extends([`@roots/eslint-config`])
  .setRules({'no-console': `error`})
  .setFailOnError(bud.isProduction)
  .setFailOnWarning(false)
  .setFix(true)
```

### Extends

You can extend a eslint config by passing an array of eslint config files to `bud.eslint.extends`.

```ts title=bud.config.js
bud.eslint.extends([`@roots/bud-eslint/config`])
```

### Rules

You can set eslint rules by passing an object to `bud.eslint.setRules`.

```ts title=bud.config.js
bud.eslint.setRules({'no-descending-specificity': null})
```

### Fail on error

By default, eslint will fail on error in production mode. You can change this behavior by setting
`bud.eslint.failOnError` to `false`.

```ts title=bud.config.js
bud.eslint.setFailOnError(false)
```

### Fail on warning

By default, eslint will not fail on warning. You can change this behavior by setting
`bud.eslint.failOnWarning` to `true`.

```ts title=bud.config.js
bud.eslint.setFailOnWarning(true)
```

### Fix

By default, eslint will not fix errors. You can change this behavior by setting
`bud.eslint.fix` to `true`.

```ts title=bud.config.js
bud.eslint.setFix(true)
```

## Installing the recommended config preset

There is a recommended eslint configuration available for you to use as a starting point.

```npm2yarn
yarn add @roots/eslint-config --dev
```

Once installed you can add it to the `extends` array in your eslint config:

```js title=".eslintrc.cjs"
module.exports = {
  root: true,
  extends: ['@roots/eslint-config'],
}
```
