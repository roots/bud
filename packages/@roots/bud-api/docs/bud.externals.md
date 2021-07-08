# bud.externals

Specify a non-standard resolution strategy for modules with a matching name.

For example, in WordPress, React is provided via `window.React` and you don't need to bundle it.

**bud.externals** allows you to use the import syntax that is standard to React component libraries: 

```js
import React from 'react'
``` 

While also ensuring that these imports reference `window.React` in your bundled code.

## Usage

```js
bud.externals({
  jQuery: 'window.jquery',
})
```
