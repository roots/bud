# bud.path

`bud.path` accepts up to two strings as parameters:

- The first is a location registered to bud. Out-of-the-box it is one of: `project`, `src`, `dist`, `storage`. It is possible for extensions to register additional locations.

- The second is an optional string which will be joined on the path returned from the first param.

Paths can be redefined using [bud.setPath](docs:config/setPath).

## Usage

Returns the absolute path to the src directory.

```js
bud.path('src')
```

Returns the absolute path to 'scripts/app.js' (from project root).

```js
bud.path('project', 'scripts/app.js')
```
