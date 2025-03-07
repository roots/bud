<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-eslint</strong></h1>

<p align="center">
  eslint support for bud.js
</p>

---

## Installation

Install **@roots/bud-eslint** to your project.

Yarn:

```sh
yarn add @roots/bud-eslint --dev
```

npm:

```sh
npm install @roots/bud-eslint --save-dev
```

## Configuration

For general information on configuring eslint see [the official Eslint user guide](https://eslint.org/docs/user-guide/configuring).

You can configure Stylelint in two ways:

- [Using a eslint config file](#using-an-eslint-config-file)
- [Employing the `bud.eslint` API](#configuring-eslint-with-budeslint)

### Using an eslint config file

You can configure eslint [using a eslint config file](https://eslint.org/docs/latest/use/configure/configuration-files).

bud.js allows for you to write your eslint config in CommonJS, ESM, TypeScript, JSON or YML. This file should be placed in the root of your project or the project `./config` directory.

```js title=eslint.config.js
export default {
  extends: [`@roots/bud-eslint/config`],
  rules: { "no-console": `error` },
};
```

### Configuring eslint with `bud.eslint`

You can configure eslint directly in your bud.js config using the `bud.eslint` API.

```ts title=bud.config.ts
bud.eslint
  .extends([`@roots/eslint-config`])
  .setRules({ "no-console": `error` })
  .setFailOnError(bud.isProduction)
  .setFailOnWarning(false)
  .setFix(true);
```

### Extends

You can extend a eslint config by passing an array of eslint config files to `bud.eslint.extends`.

```ts title=bud.config.ts
bud.eslint.extends([`@roots/bud-eslint/config`]);
```

### Rules

You can set eslint rules by passing an object to `bud.eslint.setRules`.

```ts title=bud.config.ts
bud.eslint.setRules({ "no-descending-specificity": null });
```

### Fail on error

By default, eslint will fail on error in production mode. You can change this behavior by setting
`bud.eslint.failOnError` to `false`.

```ts title=bud.config.ts
bud.eslint.setFailOnError(false);
```

### Fail on warning

By default, eslint will not fail on warning. You can change this behavior by setting
`bud.eslint.failOnWarning` to `true`.

```ts title=bud.config.ts
bud.eslint.setFailOnWarning(true);
```

### Fix

By default, eslint will not fix errors. You can change this behavior by setting
`bud.eslint.fix` to `true`.

```ts title=bud.config.ts
bud.eslint.setFix(true);
```

## Installing the recommended config preset

There is a recommended eslint configuration available for you to use as a starting point.

```bash npm2yarn
npm install @roots/eslint-config --save-dev
```

Once installed you can add it to the `extends` array in your eslint config:

```js title=".eslintrc.cjs"
module.exports = {
  root: true,
  extends: ["@roots/eslint-config"],
};
```

## License

@roots/bud-eslint is licensed under MIT.
