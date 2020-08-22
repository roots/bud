---
description: Specify the root directory of the project's source files.
---

# bud.copyAll

`bud.copyAll` copies the contents of a directory to from one location to another. This is a straight copy -- the files are not processed or  transpiled.

::: tip 🕵️‍♂️ Guide available
Details on the usage of this method are available in [the Copying Static Assets guide](guide-copying-assets.md).
:::

## Usage

```js
bud.copyAll(
 bud.src('images'),
 bud.dist('images')
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
- [bud.copy](config-copy.md)
