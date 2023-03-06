---
title: Filters
---

First, indicate the directory to resolve filter modules from:

```js title=src/index.js
roots.register.filters(`./`)
```

Then, create `*.filter.{js,ts}` modules.

Each should export the required properties of the WordPress Editor Filter API.

- `name` is the identifier for your module (sometimes referred to as `namespace` in WordPress documentation)
- `hook` is the identifier for the hook (set by WordPress).
- `callback` is the supplied function.

### Example

Using named exports:

```js title=src/example.filter.js
import {assign} from 'lodash';

/* Filter name */
export const name = `namespace/example/list`;

/* Hook id */
export const hook = `blocks.registerBlockType`;

/* Filter callback */
export const callback = (settings, name) => {
  if (name !== 'core/list') return settings;

  return assign({}, settings, {
    example: {
      innerBlocks: [
        {name: 'core/list-item', attributes: {content: 'Item a'}},
        {name: 'core/list-item', attributes: {content: 'Item b'}},
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
export const name = `example/block`
export const title = `Example Block`

export const filters = {
  'block.registerBlockType': {
    list: x => x,
  }
}
```

### Example

Example plugin which registers a `example-plugins/list/examples` filter on `blocks.registerBlockType`:

```js title=src/example.plugin.js
export const name = 'example-plugin';
export const title = 'Example Plugin';
export const render = () => null;

export const filters = {
  'blocks.registerBlockType': {
    'list/examples': x => x,
  },
}
```
