[@roots/budpack](../README.md) › [Globals](../globals.md) › ["postcss"](_postcss_.md)

# Module: "postcss"

## Index

### Functions

* [postCss](_postcss_.md#const-postcss)

## Functions

### `Const` postCss

▸ **postCss**(`__namedParameters`: object): *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*

*Defined in [postcss.js:23](https://github.com/roots/bud-support/blob/a7a0906/src/budpack/builder/api/postcss.js#L23)*

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

@param   {{enabled: boolean, plugins: array}} options
@param   {boolean}  options.enabled
@param   {array}    options.plugins
@return  {typeof import('./../index')} bud

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`enabled` | boolean | true |
`options` | options | - |

**Returns:** *"/Users/kellymears/code/projects/cli/bud/bud-support/src/budpack/builder/index"*
