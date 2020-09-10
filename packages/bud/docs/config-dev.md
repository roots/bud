---
description: Configure the Bud development server.
---

# bud.dev

Configure Bud's default development server.

There are plenty of options here but the only requirement is specifying what URL you would like to proxy, as illustrated in the usage example.

## Usage

```js
bud.dev({
  from: {
    host: 'example.test',
    // ssl: true (uncomment if your development environment is encrypted)
  }
})
```

## Signature

```ts
function ({
  /**
   * The url you want to proxy
   */
  from: {
    host: string
    port: number
    ssl: boolean
  }
  /**
   * The url you want to proxy over
   */
  to: {
    host: string
    port: number
    ssl: boolean
  }
  ws: boolean // proxy over websocket. default enabled.
  filename: string
  headers: [key: string]: string
  lazy: boolean
  logTime: boolean
  methods: string[]
  mimeTypes: [type: string]: string[]
  serverSideRender: boolean
  stats: string | {[key: string]: boolean}
  watchOptions: {
    [key: string]: any
  },
  writeToDisk: boolean
}): Bud
```

## Parameters

| Name   | Type   |
| ------ | ------ |
| `options` | development server options |

## Returns

The Bud instance
