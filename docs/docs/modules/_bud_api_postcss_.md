# Module: "bud/api/postcss"

## Functions

### `Const` postCss

▸ **postCss**(`__namedParameters`: object): *[Bud](_bud_util_types_.md#bud)*

*Defined in [src/bud/api/postcss.ts:21](https://github.com/roots/bud-support/blob/bd00b72/src/bud/api/postcss.ts#L21)*

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
`options` | options | - |

**Returns:** *[Bud](_bud_util_types_.md#bud)*
