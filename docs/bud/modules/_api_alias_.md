# Module: "api/alias"

## Functions

###  alias

▸ **alias**(`options`: any): *any*

Defined in api/alias.js:22

## bud.alias

Resolve modules through webpack aliases. Useful for situations that may otherwise require brittle relative paths.

Having defined this alias:

```js
bud.alias({'scripts': bud.src('scripts')})
```

You can now reference scripts against that alias in your import statements:

```js
import 'scripts/myScript' // replacing '../../myScript'
```

**Parameters:**

Name | Type |
------ | ------ |
`options` | any |

**Returns:** *any*
