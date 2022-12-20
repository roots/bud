---
title: Using with stylelint
---

Install the [@roots/bud-stylelint extension](https://bud.js.org/extensions/bud-stylelint):

```sh npm2yarn
yarn add @roots/bud-stylelint --dev
```

Next, in your theme directory create a `.stylelintrc.js` file and include the Sage default stylelint config:

```ts title="bud.config.mjs"
module.exports = {
  extends: ['@roots/sage/stylelint', '@roots/bud-tailwindcss/stylelint'],
  rules: {
    'color-no-invalid-hex': true,
  },
}
```

If you aren't using `@roots/bud-tailwindcss` you may remove the `@roots/bud-tailwindcss/stylelint` value from `extends`.
