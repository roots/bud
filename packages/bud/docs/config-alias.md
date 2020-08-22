---
description: Specify the root directory of the project's source files.
---

# bud.alias

Register shorthand for resolving modules and files using webpack aliases. Useful for situations that may otherwise require brittle relative paths.

## Usage

Having defined this alias:

```js
bud.alias({
  '@scripts': bud.src('scripts'),
})
```

You may now reference scripts against that alias in your application:

```js
import 'scripts/myScript' // replacing '../../myScript'
```

## Signature

```ts
function ({
  [{key: string}]: {path: string},
}[]): Bud
```

## Parameters

Name | Type |
------ | ------ |
`key` | string |
`path` | string |

## Returns

The Bud instance
