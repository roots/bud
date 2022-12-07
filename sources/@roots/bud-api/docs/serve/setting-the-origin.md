---
title: Setting the server origin
---

### Setting the port

Use a number to change the port. If the port is not available a new port will be dynamically selected.

```ts title='bud.config.js'
bud.serve(3010)
```

Use an array of numbers to specify a range of ports to try. The first available port will be used.

```ts title='bud.config.js'
bud.serve([3000, 3010])
```

### Setting the host or protocol

If you need to change hostname or protocol a [URL](https://developer.mozilla.org/en-US/docs/Web/API/URL) is preferred:

```ts title='bud.config.js'
bud.serve(new URL('http://dev.example.test:3000'))
```

But, a string can be used (it will be converted to a URL):

```ts title='bud.config.js'
bud.serve('http://dev.example.test:3000')
```
