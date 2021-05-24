# bud.persist

By default webpack builds are cached using a memory based store.

Calling `bud.persist` will opt to use a filesystem based cache. This will greatly speed up your builds. We strongly recommend giving this a shot.

If it doesn't work for you and you don't know why, please make an issue.

## Usage

Opt-in to FS build caching

```js
bud.persist()
```

Opt-out:

```js
bud.persist(false)
```
