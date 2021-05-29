<p align="center">
  <img alt="Bud" src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100">
</p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square">
  <a href="https://www.npmjs.com/package/@roots/bud-hooks">
    <img src="https://img.shields.io/npm/v/@roots/bud-hooks.svg?color=%23525ddc&style=flat-square" />
  </a>
  <a href="https://codeclimate.com/github/roots/bud-support/maintainability">
    <img src="https://img.shields.io/codeclimate/maintainability/roots/bud-support?color=%23525ddc&style=flat-square" />
  </a>
  <a href="Typescript" src="https://github.com/roots/bud/tree/stable/typings">
    <img src="https://img.shields.io/badge/typings-%40roots%2Fbud--typings-%23525ddc" />
  </a>
  <a href="https://twitter.com/rootswp">
    <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
  </a>
</p>

<h1 align="center">
  <strong>@roots/bud-hooks</strong>
</h1>

> Hooks controller for Bud

- [Installation](#installation)
- [bud.hooks.on](#budhookson)
  - [hook usage](#hook-usage)
- [bud.hooks.filter](#budhooksfilter)
  - [filter usage](#filter-usage)
- [Hooks reference](#hooks-reference)
- [Contributing](#contributing)
- [Bud sponsors](#bud-sponsors)
- [Community](#community)

## Installation

```sh
yarn add @roots/bud-hooks
```

## bud.hooks.on

Hooks are registered with `bud.hooks.on`

`bud.hooks.on` takes two parameters:

- The `name` of the hook.
- Either a value or a function to filter a value through.

### hook usage

A hook can be a reference to a literal value:

```js
bud.hooks.on("build/entry", {
  app: ["app.js"],
});
```

Or, using a function, we can modify a value that is already hooked.

This example adds new entry to the `webpack.externals` configuration

```js
bud.hooks.on('build/externals', externals => ({
  ...externals,
  $: 'jquery',
})
```

A hook value doesn't have to already be set in order to register a function, but you will need to guard against type errors yourself:

```ts
bud.hooks.on("some-mystery-hook", (value) => ({
  ...(value ?? {}), // use a more robust guard if needed
  key: "value",
}));
```

## bud.hooks.filter

Filters are registered with `bud.hooks.filter`.

It is a function that takes one parameter: the `name` of the `filter` to hook onto.

### filter usage

First, a value is registered with [bud.hooks.on](#hook-usage)

```js
// Register a value
const value = ["foo", "bar"];
bud.hooks.on("some-key", value);

// ...

// Later on, retrieve it
const filteredValue = bud.hooks.filter("some-key");
```

After registration but before it is filtered, the user and/or other extensions
now have access to this value and can modify it.

```js
bud.hooks.on("some-key", (value) => value.shift());
```

## Hooks reference

There is a compiled list of hooks used by [**@roots/bud**](https://github.com/roots/bud) core [available here](https://github.com/roots/bud/tree/stable/packages/@roots/bud-hooks/docs/hooks.md).

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
