---
description: Specify the root directory of the project's source files.
---

# bud.bundle

`bud.bundle` is used to group source assets into distinct distributables.

::: tip 🕵️‍♂️ Guide available
Details on the usage of this method are available in [the Configuration Guide](config.md). See the [Bundling source files](config/#bundle-source-files) section.
:::

## Usage

```js
bud.bundle('app', [
  bud.src('app.js'),
  bud.src('app.css'),
])
```

## Signature

```ts
function (
  name: string,
  entries: string[]
): Bud
```

## Parameters

Name | Type |
------ | ------ |
`name` | string |
`entries` | string[] |

## Returns

The Bud instance.

## Related

- [bud.glob](config-glob.md)
- [bud.copy](config-copy.md)
- [bud.copyAll](config-copyAll.md)
