# Bud Lab

Experimental space for developing with Bud.

## Note on resolving modules

In dev, the `node_modules` dir is located outside the current one, and
Bud is not setup by default to resolve modules from that location.

The fix for local dev is to just add that directory to the list of
paths Bud will try and resolve from.

```ts
bud.hooks.on('webpack.resolve.modules', modules => [
  ...modules,
  bud.fs.path.join(bud.fs.base, '../node_modules'),
])
```
