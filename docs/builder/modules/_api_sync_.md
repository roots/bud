[@roots/budpack](../README.md) › [Globals](../globals.md) › ["api/sync"](_api_sync_.md)

# Module: "api/sync"

## Index

### Functions

* [sync](_api_sync_.md#const-sync)

## Functions

### `Const` sync

▸ **sync**(`options`: object): *["index"](_index_.md)*

*Defined in [api/sync.js:17](https://github.com/roots/bud-support/blob/5f43850/src/budpack/builder/api/sync.js#L17)*

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

**Returns:** *["index"](_index_.md)*

bud
