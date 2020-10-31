---
description: Quickly add a Webpack plugin to the Webpack configuration.
---

# bud.addPlugin

Webpack plugins can be added to the configuration using this method.

## Usage

Import your plugin in the manner described by the plugin documentation. Depending on what version of node you're running and how you've configured your project importing the plugin probably looks something like this:

```js
// commonjs require
const myPlugin = require('my-plugin');

// module import
import myPlugin from 'my-plugin';
```

Now, you can add the plugin using `bud.addPlugin`. The first parameter is a name to reference the plugin by. The second parameter defines the plugin.

```js
bud.addPlugin('my-plugin', new myPlugin())
```

Above we are defining the plugin as an object. It is also possible to define the plugin as a function. Plugins defined this way will be passed the `bud` object. This can be helpful when setting plugin options:

```js
bud.addPlugin(
  'my-plugin',
  bud => new myPlugin({path: bud.src()})
);
```

Optionally, a third parameter can be passed which defines whether this plugin should be used at all. This can be helpful to only load a plugin in certain environments (as an example).

The following snippet demonstrates how to include `myPlugin` only in `development`.

```js
bud.addPlugin(
  'my-plugin',
  new myPlugin(),
  bud.mode.is('development'),
)
```

Just as with the plugin definition, you can also define this optional conditional check as a function:

```js
bud.addPlugin(
  'my-plugin',
  new myPlugin(),
  bud => bud.features.enabled('hot'),
)
```

## Signature

```ts
function (
  this: Framework.Bud,
  name: string,
  make: Framework.Extension.Make | Webpack.Plugin,
  when?: Framework.Extension.Conditional | boolean,
) => Framework.Bud
```

## Parameters

| Name   | Type   |
| ------ | ------ |
| `name` | string |
| `make` | Framework.Extension.Make | Webpack.Plugin |
| `when?` | Framework.Extension.Conditional | boolean |

## Returns

`Framework.Bud`: The Bud instance
