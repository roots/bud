<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud-stylelint</strong></h1>

<p align="center">
  Adds stylelint support to Bud
</p>

---

## Installation

Install **@roots/bud-stylelint** to your project.

Yarn:

```sh
yarn add @roots/bud-stylelint --dev
```

npm:

```sh
npm install @roots/bud-stylelint --save-dev
```

## Overview

The `bud.stylelint` class provides an API for integrating Stylelint, a modern linter that helps you avoid errors and enforce conventions in your styles. It has a variety of methods and properties that allow for detailed configuration of how Stylelint should behave.

## Options

The `bud.stylelint` API provides a number of options that can be used to configure Stylelint. These options include:

- `cache`: Enables caching of lint results to improve performance on subsequent runs. By default, it's set to true unless in a continuous integration (CI) environment.
- `cacheLocation`: Specifies the location of the cache. By default, it's set to a directory named `stylelint` in the cache directory.
- `config`: Specifies the Stylelint configuration object. By default, it finds the first file with `stylelint` in its name and uses that as the config.
- `context`: The context path. By default, it's set to the `@src` directory.
- `failOnError`: Indicates whether to fail the build when errors are detected. By default, this is true in production environments.
- `failOnWarning`: Indicates whether to fail the build when warnings are detected. By default, this is set to false.
- `files`: Specifies the files to be linted. By default, this is undefined, meaning that all files will be linted.
- `fix`: Indicates whether Stylelint should try to fix any issues it finds. By default, this is set to false.
- `stylelintPath`: The path to the Stylelint binary. By default, this is undefined, meaning that the binary in the node_modules directory will be used.

## Methods

The `bud.stylelint` API provides several methods for interacting with these options. These methods include:

- `extends(config)`: Allows you to extend a base Stylelint configuration.
- `setRules(rules)`: Sets the Stylelint rules to be used.
- `getRules()`: Gets the currently set Stylelint rules.
- `setPlugins(plugins)`: Sets the Stylelint plugins to be used.
- `getPlugins()`: Gets the currently set Stylelint plugins.
- `setFailOnError(boolean)`: Sets whether the build should fail when Stylelint detects errors.
- `setFailOnWarning(boolean)`: Sets whether the build should fail when Stylelint detects warnings.
- `setFiles(files)`: Sets the files to be linted.
- `getFiles()`: Gets the files to be linted.

## Example usage

Here's an example of how you can use the `bud.stylelint` API in your Bud configuration:

```ts title=bud.config.ts
import { type Bud } from "@roots/bud";

export default async (bud: Bud) => {
  bud.entry("app", ["app.js", "app.css"]);

  bud.stylelint
    .extends([`@roots/bud-stylelint/config`])
    .setRules({ "no-descending-specificity": null })
    .setFailOnError(bud.isProduction)
    .setFailOnWarning(false)
    .setFix(true);
};
```

In this example, we are extending the default `@roots/bud-stylelint/config`, setting a custom rule `no-descending-specificity`, and adjusting the behavior for errors and warnings based on the environment. We also set `setFix(true)` to instruct Stylelint to attempt to fix any issues it detects.

## Using a stylelint config

You can also configure stylelint [using a stylelint config file](https://stylelint.io/user-guide/configure).

bud.js allows for you to write your stylelint config in CommonJS, ESM, TypeScript, JSON or YML. This file should be placed in the root of your project or the project `./config` directory.

```js title=stylelint.config.js
export default {
  extends: [`@roots/bud-stylelint/config`],
  rules: { "no-descending-specificity": null },
};
```

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/bud-stylelint is licensed under MIT.

## Community

Keep track of development and community news.

- Join us on Roots Slack by becoming a [GitHub
  sponsor](https://github.com/sponsors/roots)
- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)

## Sponsors

**Bud** is an open source project and completely free to use.

However, the amount of effort needed to maintain and develop new features and projects within the Roots ecosystem is not sustainable without proper financial backing. If you have the capability, please consider [sponsoring Roots](https://github.com/sponsors/roots).

<a href="https://k-m.com/">
<img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150"/>
</a>
<a href="https://carrot.com/">
<img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="200" height="150"/>
</a>
<a href="https://wordpress.com/">
<img src="https://cdn.roots.io/app/uploads/wordpress.svg" alt="WordPress.com" width="200" height="150"/>
</a>
<a href="https://worksitesafety.ca/careers/">
<img src="https://cdn.roots.io/app/uploads/worksite-safety.svg" alt="Worksite Safety" width="200" height="150"/>
</a>
<a href="https://www.copiadigital.com/">
<img src="https://cdn.roots.io/app/uploads/copia-digital.svg" alt="Copia Digital" width="200" height="150"/>
</a>
<a href="https://www.freave.com/">
<img src="https://cdn.roots.io/app/uploads/freave.svg" alt="Freave" width="200" height="150"/>
</a>
