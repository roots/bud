---
title: Using a stylelint config
---

You can also configure stylelint [using a stylelint config file](https://stylelint.io/user-guide/configure).

bud.js allows for you to write your stylelint config in CommonJS, ESM, TypeScript, JSON or YML. This file should be placed in the root of your project or the project `./config` directory.

```js title=stylelint.config.js
export default {
  extends: [`@roots/bud-stylelint/config`],
  rules: {'no-descending-specificity': null},
}
```
