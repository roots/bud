---
description: Compile project assets by running bud.config.js with Node.
---

# Compiling assets

Assets are compiled with the bud cli's `build` command.

```sh
$ bud build
```

## Compiling in `production` mode

```sh
$ bud build --mode production
```

## Compiling in `development` mode

```sh
$ bud build --mode development
```

## Debugging

Dumps extra information and build objects to terminal and disk.

```sh
$ bud build --debug
```

## Minify assets

```sh
$ bud build --minify
```

## Compress built assets with gzip

```sh
$ bud build --gzip
```

## Compress built assets with brotli

```sh
$ bud build --brotli
```

## Hash filename output

```sh
$ bud build --hash
```

## Produce a `vendor` bundle

```sh
$ bud build --vendor
```

## Produce a `runtime` bundle

```sh
$ bud build --runtime
```

## Specify a `project` directory

```sh
$ bud build --project /absolute/path/to/project
```

## Specify a `src` directory

```sh
$ bud build --src resources
```

## Specify a `dist` directory

```sh
$ bud build --dist distributables
```

## Produce with an html template

```sh
$ bud build --html
```

## Use a bud config with the standard webpack CLI

Alternatively, you can generate the configuration and pass it to Webpack yourself.
The simplest way is to export the config as a module for consumption by the `webpack-cli`.

```js
// ...config
module.exports = bud.build.make()
```
