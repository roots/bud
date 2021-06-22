# bud.runtime

Generate a runtime chunk intended to be inlined on the page. Used for code splitting.

## Usage

```js
bud.runtime();
```

By default `bud` generates a runtime per chunk. You may want to generate a single runtime for your application.
You can override the `runtimeChunk` setting using this function, in that case.

```js
bud.runtime("single");
```

The function will accept anything that webpack would.
