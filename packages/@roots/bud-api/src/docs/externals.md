# bud.externals

Specify a non-standard resolution strategy for modules with a matching name.

For example, in @wordpress/wordpress, React is provided by `window.React` and you don't need to bundle it. This allows you to use `import React from 'react'` syntax in your src code but have that transpile to a reference to `window.React` in the bundle.

## Usage

```js
bud.externals({
  jQuery: 'window.jquery',
})
```
