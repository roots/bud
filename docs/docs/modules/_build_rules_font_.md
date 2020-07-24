# Module: "build/rules/font"

## Functions

### `Const` font

▸ **font**(`builder`: any): *object*

*Defined in [src/build/rules/font.ts:10](https://github.com/roots/bud-support/blob/bd00b72/src/build/rules/font.ts#L10)*

Font module rules

**Parameters:**

Name | Type |
------ | ------ |
`builder` | any |

**Returns:** *object*

* **builder**: *any*

* **make**(): *object*

  * **test**: *RegExp‹›* = patterns.font

  * **use**: *object[]* = [
        {
          loader: loaders.url,
          options: {
            name: '[path][name].[ext]',
          },
        },
      ]
