# bud.proxy

Users building on top of a server-side framework like WordPress, Laravel, RoR, etc. will likely need to proxy their established development server.

## Usage

**bud.proxy**, with nothing passed, will proxy `localhost:8000`.

```ts
bud.proxy();
```

Optionally, you may also use **bud.proxy** to configure the host and port:

```ts
bud.proxy({
  host: 'example.test',
  port: 8000,
});
```
