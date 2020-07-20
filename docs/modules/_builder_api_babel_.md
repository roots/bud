[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/api/babel"](_builder_api_babel_.md)

# Module: "builder/api/babel"

## Index

### Functions

* [babel](_builder_api_babel_.md#const-babel)

## Functions

### `Const` babel

▸ **babel**(`options`: object): *["builder/index"](_builder_index_.md)*

Defined in src/builder/api/babel.js:16

Configure Babel.

If you prefer, you may utilize a babel.config.js file in the project root,
either alongside or in lieue of this configuration.

Conflicts between supplied configs will be resolved in favor of bud.config.js.

**`see`** https://babeljs.io/docs/en/configuration

**Parameters:**

▪ **options**: *object*

Name | Type |
------ | ------ |
`enabled` | boolean |
`plugins` | any[] |
`presets` | any[] |

**Returns:** *["builder/index"](_builder_index_.md)*

bud
