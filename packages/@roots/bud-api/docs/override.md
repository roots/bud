# bud.override

Modify the final webpack configuration. This is the last chance to make amendments before compilation.

## Usage

Provide a callback which modifies the configuration

```js
bud.override((webpackConfig) => {
  webpackConfig.cache = false;

  return webpackConfig;
});
```
