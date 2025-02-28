<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/bud</strong></h1>

<p align="center">
  Configurable, extensible build tools for modern single and multi-page web applications
</p>

---

## Installation

Install **@roots/bud** to your project.

Yarn:

```sh
yarn add @roots/bud --dev
```

npm:

```sh
npm install @roots/bud --save-dev
```

## Getting started

For help getting started consult the [Getting Started guide on bud.js.org](https://bud.js.org/guides/getting-started)

## CLI

**bud.js** is invoked with the `bud` command.

Call `bud --help` for usage information.

## Node

Instantiate **bud.js** using the `factory` export:

```js
import { factory } from "@roots/bud/factory";

const bud = await factory();
```

## License

@roots/bud is licensed under MIT.
