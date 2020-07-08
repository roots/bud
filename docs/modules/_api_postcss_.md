[@roots/budpack](../globals.md) › ["api/postcss"](_api_postcss_.md)

# Module: "api/postcss"

## Index

### Functions

* [postCss](_api_postcss_.md#const-postcss)

## Functions

### `Const` postCss

▸ **postCss**(`options`: object): *["index"](_index_.md)*

*Defined in [api/postcss.js:15](https://github.com/roots/bud-support/blob/49a29fe/src/budpack/builder/api/postcss.js#L15)*

Configure PostCSS.

If you prefer, you may utilize a postcss.config.js file in the project root,
either alongside or in lieue of this configuration.

Conflicts between supplied configs will be resolved in favor of bud.config.js.

**Parameters:**

▪ **options**: *object*

Name | Type |
------ | ------ |
`enabled` | boolean |
`plugins` | array |

**Returns:** *["index"](_index_.md)*

bud
