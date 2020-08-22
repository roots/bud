---
description: Compile project assets by running bud.config.js with Node.
---

# Compiling assets

Compile project assets by running your config with Node.

```sh
node bud.config.js
```

## Compiling in `production` mode

```sh
node bud.config.js --env production
```

## Compiling in `development` mode

```sh
node bud.config.js --env development
```

## Use a bud config with the standard webpack CLI

Alternatively, you can generate the configuration and pass it to Webpack yourself. The simplest way is to export the config from a file named `webpack.config.js`.

```js
module.exports = bud.config()
```
