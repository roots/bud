# bud.hash

Enable filename hashing of built assets.

## Usage

Enable hashing:

```js
bud.hash()
```

You may also explicitly pass a boolean **true**:

```js
bud.hash(true)
```

Disable hashing:

```js
bud.hash(false)
```

## Customizing the hash format

```js
bud.store.set('hashFormat', '[name].[contenthash:6]')
```
