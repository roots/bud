For general information on configuring eslint see [the official Eslint user guide](https://eslint.org/docs/user-guide/configuring).

As a courtesy, there is a recommended eslint configuration available for you to use as a base in your project:

```js
module.exports = {
  root: true,
  extends: ['@roots/bud-eslint/config'],
  rules: {},
}
```

Other extensions may make additional eslint configurations available. These are, generally speaking, composable.
