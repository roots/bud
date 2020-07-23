# Module: "api/babel"

## Variables

### \_\_assign

• **\_\_assign**: _any_ = (this && this.**assign) || function () {
**assign = Object.assign || function(t) {
for (var s, i = 1, n = arguments.length; i < n; i++) {
s = arguments[i];
for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
t[p] = s[p];
}
return t;
};
return \_\_assign.apply(this, arguments);
}

Defined in api/babel.js:2

## Functions

### babel

▸ **babel**(`options`: any): _any_

Defined in api/babel.js:27

## bud.babel

Configure Babel.

If you prefer, you may utilize a babel.config.js file in the project root,
either alongside or in lieue of this configuration.

Conflicts between supplied configs will be resolved in favor of bud.config.js.

**`see`** https://babeljs.io/docs/en/configuration

**Parameters:**

| Name      | Type |
| --------- | ---- |
| `options` | any  |

**Returns:** _any_
