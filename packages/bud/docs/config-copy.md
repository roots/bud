---
description: Specify the root directory of the project's source files.
---

# bud.copy

`bud.copy` is copy a file from one location to another. This is a straight copy -- the file will not be transpiled.

::: tip 🕵️‍♂️ Guide available
Details on the usage of this method are available in [the Copying Static Assets guide](guide-copying-assets.md).
:::

## Usage

```js
bud.copy(
  bud.src('images/logo.png'),
  bud.dist('logo.png'),
)
```

## Signature

```ts
function (
  from: string,
  to: string,
): Bud
```

## Parameters

Name | Type |
------ | ------ |
`from` | string |
`to` | string |

## Returns

The Bud instance.

## Related

- [bud.glob](config-glob.md)
- [bud.copyAll](config-copyAll.md)
