[@roots/budpack](../README.md) › [Globals](../globals.md) › ["builder/api/sync"](_builder_api_sync_.md)

# Module: "builder/api/sync"

## Index

### Functions

* [sync](_builder_api_sync_.md#const-sync)

## Functions

### `Const` sync

▸ **sync**(`options`: object): *["builder/index"](_builder_index_.md)*

Defined in src/builder/api/sync.js:17

Configure BrowserSync.

**`example`** 
bud.sync({
  enabled: !bud.inProduction,
  proxy: 'http://bud.test',
  host: 'localhost',
  port: 3000,
})

**Parameters:**

▪ **options**: *object*

Name | Type |
------ | ------ |
`enabled` | object |
`host` | object |
`port` | object |
`proxy` | object |

**Returns:** *["builder/index"](_builder_index_.md)*

bud
