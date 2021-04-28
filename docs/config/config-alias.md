---
description: Resolve modules with shorthand.
---

# bud.alias

Register shorthand for resolving modules using webpack aliases. Useful for situations that may otherwise require brittle relative paths.

## Usage

Imagine a file located at `scripts/my-feature/components/example/index.js` that is importing a function `merge` from `scripts/util.js`. The import statement looks like:

```js
import {merge} from '../../../util'
```

But, we can define an `alias`

```js
bud.alias({
  '@scripts': bud.path('src', 'scripts'),
})
```

And import it as follows:

```js
import {merge} from '@scripts/util'
```

This can prove especially useful later, should we have cause to move `scripts/my-feature/components/example/index.js`.

Without the alias we would need to rework the relative path between the two files. But, the `@scripts/util` alias is independent of the path of the importing file.
