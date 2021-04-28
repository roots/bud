---
description: Develop client assets on top of an existing application.
---

# bud.proxy

Users building on top of an existing backend framework like WordPress, Laravel, RoR, etc.
will likely want to proxy their established development server.

## Usage

`bud.proxy`, with nothing passed, will attempt to proxy `localhost:8000`.

```ts
bud.proxy()
```

Optionally, you may configure the host and port:

```ts
bud.proxy({
  host: 'example.test',
  port: 8000,
})
```

You may explicitly enable or disable the proxy:

```ts
bud.proxy({enabled: true})
```

To configure SSL, you will need to use `bud.proxy` in conjunction with [`bud.dev`](/docs/config-dev.md).

## Example implementations

- [/docs/examples/wordpress-theme](/docs/examples/wordpress-theme).

## Signature

```ts
function (options: {
  host?: string
  port?: number
}): Bud
```

## Parameters

| Name              | Type         |
| ----------------- | ------------ |
| `options.enabled` | Toggle proxy |
| `options.host`    | Host host    |
| `options.port`    | Port         |

## Returns

`Bud`: The Bud instance
