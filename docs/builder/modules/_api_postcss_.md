[@roots/budpack](../README.md) › [Globals](../globals.md) › ["api/postcss"](_api_postcss_.md)

# Module: "api/postcss"

## Index

### Type aliases

* [PostCss](_api_postcss_.md#postcss)

### Functions

* [postCss](_api_postcss_.md#const-postcss)

## Type aliases

###  PostCss

Ƭ **PostCss**: *function*

*Defined in [api/postcss.ts:36](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/api/postcss.ts#L36)*

#### Type declaration:

▸ (`options?`: object): *bud*

**Parameters:**

▪`Optional`  **options**: *object*

Name | Type |
------ | ------ |
`enabled?` | boolean |
`plugins?` | any[] |

## Functions

### `Const` postCss

▸ **postCss**(`__namedParameters`: object): *any*

*Defined in [api/postcss.ts:19](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/api/postcss.ts#L19)*

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
`enabled` | boolean | true |
`options` | [options](_base_options_.md#const-options) | - |

**Returns:** *any*
