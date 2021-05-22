## Summary

`app.library` differs from `app.vendor` in that it doesn't just separate the vendored code from the application code, but actually stops the vendored assets from needing to be rebuilt at all.

The first build will likely take longer as the DLL will need to be compiled, but subsequent builds should see a noticeable reduction in build time.

## Installation

```sh
yarn add @roots/bud-library --dev
```

## Usage

```js
module.exports = app =>
  app
    .use('@roots/bud-library')
    .library(['react', 'react-dom', 'react-forms'])
```

Pass `app.library` the module you would like to add to the DLL cache:

```js
app.library('jquery')
```

Multiple modules can be added using an array:

```js
app.library(['jquery', 'bootstrap'])
```
