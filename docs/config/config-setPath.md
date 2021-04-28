---
description: Define the paths of various locations on disk.
---

# bud.setPath

Sets a project location.

It accepts two strings:

- The first is a location registered to bud. Out-of-the-box it is one of: `project`, `src`, `dist`, `storage`. It is possible for extensions to register additional locations.

- The second is the path being assigned to this location. If `project` is being defined this path should be absolute. All other paths should be supplied as relative to `project`.

Alternatively, this function may also accept a key-value object, so that multiple locations can be redefined at once.

Once set, this directory may be utilitized using [bud.path](config-path.md).

## Usage

Defines the `src` directory as `scripts` (relative to project root).

```js
bud.setPath('src', 'scripts')
```

Defines both the `src` and `dist` directories in one call:

```js
bud.srcPath({
  src: 'scripts',
  dist: 'public',
})
```

## Interface

| Name   | Type   |
| ------ | ------ |
| `path` | string |

or

| Name        | Type   |
| ----------- | ------ |
| `locations` | object |
