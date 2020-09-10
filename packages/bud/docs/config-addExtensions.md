---
description: Explicitly define the extensions used in your project.
---

# bud.addExtensions

Let Webpack know that your project supports additional extensions. If you have installed an add-on like [@roots/bud-sass](/plugins-sass) it most likely already does this and you don't need to define it for yourself.

## Usage

```js
/**
 * Should be fine whether you include the '.' or not.
 */
bud.addExtensions(['tsx', '.ts'])
```

## Signature

```ts
function (string[]): Bud
```

## Parameters

| Name   | Type   |
| ------ | ------ |
| `extensions`  | string |

## Returns

The Bud instance
