<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://www.npmjs.com/package/@roots/bud-tailwindcss">
    <img src="https://img.shields.io/npm/v/@roots/bud-tailwindcss.svg?color=%23525ddc&style=flat-square" />
  </a>
  <a href="https://codeclimate.com/github/roots/bud-support/maintainability">
    <img src="https://img.shields.io/codeclimate/maintainability/roots/bud-support?color=%23525ddc&style=flat-square" />
  </a>
  <a href="https://github.com/roots/bud/actions/workflows/build">
    <img src="https://github.com/roots/bud/actions/workflows/build.yml/badge.svg" />
  </a>
  <a href="Typescript" src="https://github.com/roots/bud/tree/stable/typings">
    <img src="https://img.shields.io/badge/typings-%40roots%2Fbud--typings-%23525ddc" />
  </a>
  <a href="https://twitter.com/rootswp">
    <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
  </a>
</p>

<h1 align="center">
  <strong>@roots/bud-tailwindcss</strong>
</h1>

> Adds tailwindcss support to Bud

- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
  - [Parameters](#parameters)
    - [tailwindConfig](#tailwindconfig)
    - [implementation](#implementation)
- [Contributing](#contributing)
- [Bud sponsors](#bud-sponsors)
- [Community](#community)

## Requirements

If you haven't already installed [**@roots/bud-postcss**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-postcss) you'll need to do that first.

```sh
yarn add @roots/bud-postcss postcss --dev
```

## Installation

Install your choice of `tailwindcss` or `@tailwindcss/jit` to your project.

```sh
yarn add @roots/bud-tailwindcss @tailwindcss/jit --dev
```

## Usage

Add the extension to your config:

```js
bud.use(["@roots/bud-postcss", "@roots/bud-tailwindcss"]);
```

Again, take note that [**@roots/bud-postcss**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-postcss) is required to utilize [**@roots/bud-tailwindcss**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-tailwindcss).

You should now be good to utilize tailwind in your [**@roots/bud-tailwindcss**](https://github.com/roots/bud/tree/stable/packages/@roots/bud-tailwindcss) project. You may use it with scss or postcss.

```sh
yarn bud publish @roots/bud-tailwindcss tailwind.config.js
```

## Configuration

You may use the `bud.tailwind` function to apply further customizations to your project. This is totally optional.

```js
bud.tailwind(config, implementation);
```

### Parameters

#### tailwindConfig

Specify a custom path to your tailwind config:

```js
bud.tailwind(budpath("project", "path/to/config.js"));
```

You can also provide your tailwind config as an object, should you prefer.

```js
bud.tailwind({
  theme: ({ theme }) => ({
    colors: {},
  }),
});
```

#### implementation

Additionally, you may use the second parameter to specify if you prefer to use `tailwindcss` or `@tailwindcss/jit` (in case you have both installed in your modules directory):

```js
bud.tailwind(config, "@tailwindcss/jit");
```

## Contributing

Contributions are welcome from everyone.

We have [contributing guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## Bud sponsors

Help support our open-source development efforts by [becoming a patron](https://www.patreon.com/rootsdev).

<a href="https://kinsta.com/?kaid=OFDHAJIXUDIV">
  <img src="https://cdn.roots.io/app/uploads/kinsta.svg" alt="Kinsta" width="200" height="150">
</a>
<a href="https://k-m.com/">
  <img src="https://cdn.roots.io/app/uploads/km-digital.svg" alt="KM Digital" width="200" height="150">
</a>
<a href="https://carrot.com/">
  <img src="https://cdn.roots.io/app/uploads/carrot.svg" alt="Carrot" width="200" height="150">
</a>
<a href="https://www.c21redwood.com/">
  <img src="https://cdn.roots.io/app/uploads/c21redwood.svg" alt="C21 Redwood Realty" width="200" height="150">
</a>
<a href="https://wordpress.com/">
  <img src="https://cdn.roots.io/app/uploads/wordpress.svg" alt="WordPress.com" width="200" height="150">
</a>
<a href="https://icons8.com/">
  <img src="https://cdn.roots.io/app/uploads/icons8.svg" alt="Icons8" width="200" height="150">
</a>
<a href="https://www.harnessup.com/">
  <img src="https://cdn.roots.io/app/uploads/harness-software.svg" alt="Harness Software" width="200" height="150">
</a>
<a href="https://www.codersclan.com/">
  <img src="https://cdn.roots.io/app/uploads/coders-clan.svg" alt="Coders Clan" width="200" height="150">
</a>
<a href="https://generodigital.com/">
  <img src="https://cdn.roots.io/app/uploads/genero.svg" alt="Genero" width="200" height="150">
</a>
<a href="https://motto.ca/roots">
  <img src="https://cdn.roots.io/app/uploads/motto.svg" alt="Motto" width="200" height="150">
</a>

## Community

Keep track of development and community news.

- Participate on the [Roots Discourse](https://discourse.roots.io/)
- Follow [@rootswp on Twitter](https://twitter.com/rootswp)
- Read and subscribe to the [Roots Blog](https://roots.io/blog/)
- Subscribe to the [Roots Newsletter](https://roots.io/subscribe/)
- Listen to the [Roots Radio podcast](https://roots.io/podcast/)
