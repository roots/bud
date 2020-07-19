[@roots/budpack](../README.md) › [Globals](../globals.md) › ["postcss"](_postcss_.md)

# Module: "postcss"

## Index

### Interfaces

* [PostCssInterface](../interfaces/_postcss_.postcssinterface.md)

### Type aliases

* [PostCss](_postcss_.md#postcss)

### Functions

* [postCss](_postcss_.md#const-postcss)

## Type aliases

###  PostCss

Ƭ **PostCss**: *function*

Defined in postcss.ts:43

#### Type declaration:

▸ (`PostCssInterface`: any): *bud*

**Parameters:**

Name | Type |
------ | ------ |
`PostCssInterface` | any |

## Functions

### `Const` postCss

▸ **postCss**(`__namedParameters`: object): *any*

Defined in postcss.ts:19

## bud.postCss

Configure PostCSS.

If you prefer, you may utilize a postcss.config.js file in the project root,
either alongside or in lieue of this configuration.

Conflicts between supplied configs will be resolved in favor of bud.config.js.

```js
bud.postCss({
  plugins: [
   require('astroturf'),
  ],
})
```

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`enabled` | any | true |
`options` | any | - |

**Returns:** *any*
