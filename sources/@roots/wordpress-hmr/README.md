<p align="center"><img src="https://cdn.roots.io/app/uploads/logo-bud.svg" height="100" alt="bud.js" /></p>

<p align="center">
  <img alt="MIT License" src="https://img.shields.io/github/license/roots/bud?color=%23525ddc&style=flat-square" />
  <img alt="npm" src="https://img.shields.io/npm/v/@roots/bud.svg?color=%23525ddc&style=flat-square" />
  <img alt="Follow Roots" src="https://img.shields.io/twitter/follow/rootswp.svg?color=%23525ddc&style=flat-square" />
</p>

<h1 align="center"><strong>@roots/wordpress-hmr</strong></h1>

<p align="center">
  WordPress HMR scripts
</p>

---

## Installation

Install **@roots/wordpress-hmr** to your project.

Yarn:

```sh
yarn add @roots/wordpress-hmr --dev
```

npm:

```sh
npm install @roots/wordpress-hmr --save-dev
```

## Overview

This library adds support for registering `blocks`, `filters`, `formats`, `styles`, `variations` and `plugins`.

All modules registered with this API are registered in production and development. In development additional hot module reloading support is added.

## Adding support to your application

There are two steps:

- Making the root registration call for a given type or types.
- Adding modules to your application

In general, the above steps are the same for working with any of the supported APIs.

### Making the root registration call

In your app (recommendation: entrypoint) call `roots.register.[type]`, supplying the root directory where registrables are found.

For example, to register blocks in your application, you'd add this call:

```js title=src/index.js
roots.register.blocks("./");

/** Don't forget to accept any module updates! */
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept(console.error);
}
```

### Adding modules to your application

bud.js will look for modules in the directory indicated in the root registration call. Modules are named like `*.[type].[ext]`.

The module should export the required settings and the `name` of the entity.

Modules can be created using either default exports or named exports.

## What are the advantages

Without this library, if you have modified the content of a block you are developing in the editor and then make changes to a block's code _that cause it to render differently_, WordPress may mark the block as invalid.

This library intercepts the module update and caches the state of the block outside of WordPress' state tree. It then completely unregisters the block and then re-registers it. If the block was selected before the module update, it also deselects and reselects it.

WordPress is now looking at a different situation: a newly registered block with newly registered state. There is no discrepency and so the block is not flagged as invalid.

This library also provides a more declarative way of registering modules with WordPress than the default API, and is less prone to understandable errors importing the wrong registration functions, etc.

### Blocks

First, indicate the directory to resolve block modules from:

```js title=src/index.js
roots.register.blocks("./");
```

Then, in your application you can create `*.block.{js,ts}` modules.

Each should export the required properties of the WordPress Block API. They should also export the block `name` (sometimes referred to as `namespace` in WordPress documentation).

### Example

Using named exports:

```js title=src/blocks/example.block.js
export const name = `bud-project/example-block`;
export const title = `Example block`;
export const edit = () => (
  <div>
    <h1>Hello world!</h1>
  </div>
);
```

Using a default export:

```js title=src/blocks/example.block.js
export default {
  name: `bud-project/example-block`,
  title: `Example block`,
  edit: () => (
    <div>
      <h1>Hello world!</h1>
    </div>
  ),
};
```

### Plugins

First, indicate the directory to resolve plugin modules from:

```js title=src/index.js
roots.register.plugins("./");
```

Then, create `*.plugin.{js,ts}` modules.

Each should export the required properties of the WordPress Editor Plugin API. They should also export the plugin `name` (sometimes referred to as `namespace` in WordPress documentation).

### Example

Using named exports:

```js title=src/example.plugin.js
export const name = `example-plugin`;
export const title = `Example plugin`;
export const render = () => null;
```

Using a default export:

```js title=src/example.plugins.js
export default {
  name: `example-plugin`,
  title: `Example plugin`,
  render: () => null,
};
```

### Styles

First, indicate the directory to resolve style modules from:

```js title=src/index.js
roots.register.styles("./");
```

Then, create `*.style.{js,ts}` modules.

Each should export the required properties of the WordPress block styles API.

### Example

Using named exports:

```js title=src/example.style.js
export const block = `core/list`;
export const name = `custom`;
export const label = `Custom`;
export const isDefault = false;
```

Using a default export:

```js title=src/example.style.js
export default {
  block: `core/list`,
  name: `custom`,
  label: `Custom`,
  isDefault: false,
};
```

### Filters

First, indicate the directory to resolve filter modules from:

```js title=src/index.js
roots.register.filters(`./`);
```

Then, create `*.filter.{js,ts}` modules.

Each should export the required properties of the WordPress Editor Filter API.

- `name` is the identifier for your module (sometimes referred to as `namespace` in WordPress documentation)
- `hook` is the identifier for the hook (set by WordPress).
- `callback` is the supplied function.

### Example

Using named exports:

```js title=src/example.filter.js
import { assign } from "lodash";

/* Filter name */
export const name = `namespace/example/list`;

/* Hook id */
export const hook = `blocks.registerBlockType`;

/* Filter callback */
export const callback = (settings, name) => {
  if (name !== "core/list") return settings;

  return assign({}, settings, {
    example: {
      innerBlocks: [
        { name: "core/list-item", attributes: { content: "Item a" } },
        { name: "core/list-item", attributes: { content: "Item b" } },
      ],
    },
  });
};
```

Using a default export

```js title=src/example.filter.js
import {assign} from 'lodash'

export default {
  /** Filter id */
  name: `namespace/example/list`,
  /** Hook id */
  hook: `blocks.registerBlockType`,
  /** Filter callback */
  callback: (settings, name) => {
  if (name !== 'core/list') return settings;

  return assign({}, settings, {
    example: {
      innerBlocks: [
        {name: 'core/list-item', attributes: {content: 'Item a'}},
        {name: 'core/list-item', attributes: {content: 'Item b'}},
      ],
    },
  })
}
```

## Registering filters from a block or plugin

You may also export a `filters` object to register filters from either `*.plugin.js` or `*.block.js` modules.

The `name` of the filter will automatically have the block or plugin namespace applied to it (if you don't include the namespace manually).

So, the following filter would be registered as `example/block/list`:

```ts title=example.block.js
export const name = `example/block`;
export const title = `Example Block`;

export const filters = {
  "block.registerBlockType": {
    list: (x) => x,
  },
};
```

### Example

Example plugin which registers a `example-plugins/list/examples` filter on `blocks.registerBlockType`:

```js title=src/example.plugin.js
export const name = "example-plugin";
export const title = "Example Plugin";
export const render = () => null;

export const filters = {
  "blocks.registerBlockType": {
    "list/examples": (x) => x,
  },
};
```

### Formats

First, indicate the directory to resolve format modules from:

```js title=src/index.js
roots.register.formats("./");
```

Then, create `*.format.{js,ts}` modules.

Each should export the required properties of the WordPress Editor Format API. They should also export the format `name` (sometimes referred to as `namespace` in WordPress documentation).

### Example

Using named exports:

```js title=src/example.format.js
export const name = `bud-project/example-format`;
export const title = `Example format`;
export const tagName = "span";
export const className = "example-format";
```

Using a default export:

```js title=src/example.format.js
export default {
  name: `bud-project/example-format`,
  title: `Example format`,
  tagName: "span",
  className: "example-format",
};
```

### Variations

First, indicate the directory to resolve variation modules from:

```js title=src/index.js
roots.register.variations("./");
```

Then, create `*.variation.{js,ts}` modules.

Each should export the required properties of the WordPress Editor Variations API.

They should also export the variation `name` (sometimes referred to as `namespace` in WordPress documentation).

### Example

Using named exports:

```js title=src/example.variation.js
export const block = `core/list`;
export const name = `custom`;
export const label = `Custom`;
export const isDefault = false;
```

Using a default export:

```js title=src/example.variation.js
export default {
  block: `core/list`,
  name: `custom`,
  label: `Custom`,
  isDefault: false,
};
```

## Contributing

Contributions are welcome from everyone.

We have [contribution guidelines](https://github.com/roots/guidelines/blob/master/CONTRIBUTING.md) to help you get started.

## License

@roots/wordpress-hmr is licensed under MIT.

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
<a href="https://pantheon.io/">
<img src="https://cdn.roots.io/app/uploads/pantheon.svg" alt="Pantheon" width="200" height="150"/>
</a>
<a href="https://worksitesafety.ca/careers/">
<img src="https://cdn.roots.io/app/uploads/worksite-safety.svg" alt="Worksite Safety" width="200" height="150"/>
</a>
<a href="https://www.copiadigital.com/">
<img src="https://cdn.roots.io/app/uploads/copia-digital.svg" alt="Copia Digital" width="200" height="150"/>
</a>
