---
description: Resolve modules with shorthand.
---

# bud.alias

Register shorthand for resolving modules using webpack aliases. Useful for situations that may otherwise require brittle relative paths.

## Usage

Imagine a file located at `scripts/my-feature/components/example/index.js` that is importing functionality from `scripts/util.js`. The import statement looks like:

```js
import {merge} from '../../../util'
```

Now, having defined this alias:

```js
bud.alias({
  '@scripts': bud.src('scripts'),
})
```

We may instead import it as:

```js
import {merge} from 'scripts/util' // replacing '../../../util'
```

This can prove especially useful if later we have cause to move `scripts/my-feature/components/example/index.js`. Without the alias we would need to redo the relative import. But, the `@scripts/util` alias is independent of the path of the importing file.

## Signature

```ts
function ({
  [{key: string}]: {path: string},
}): Bud
```

## Parameters

| Name     | Type   |
| -------- | ------ |
| `handle` | string |
| `path`   | string |

## Returns

`Bud` - The Bud instance
