---
description: Compile project assets by running bud.config.js with Node.
---

# Compiling assets

Assets are compiled with the `bud build` command.

```sh
bud build [environment]
```

The environment should be set to either `development` or `production`.

## Defaults

If run without any arguments it is the equivalent of entering:

```sh
bud build production --manifest --cache
```

## Arguments

### Run in CI mode

Simpler output for better compatibility and build artifacts.

```sh
bud build production --ci
```

### Debugging

Dumps extra information and build objects to disk (`.bud/records`).

```sh
bud build production --debug
```

### Logging

Log verbose output for debugging

```sh
bud build production --log
```

### Autodiscover

Automatically discover and utilize installed packages.

```sh
bud build production --autodiscover
```

### Minify assets

```sh
bud build production --minify
```

### Hash compiled asset filenames

```sh
bud build production --hash
```

### Produce a `vendor` bundle

```sh
bud build production --vendor
```

### Produce a `runtime` bundle

```sh
bud build production --runtime
```

### Specify a devtool (source-maps)

```sh
# Enable source-maps
bud build production --devtool

# Specify a specific devtool
bud build production --devtool cheap-eval-source-map
```

### Specify `src` directory

```sh
bud build production --src resources
```

### Specify `dist` directory

```sh
bud build production --dist distributables
```

### Specify `node_modules` directory

```sh
bud build production --modules ../path-to-node_modules
```

### Specify `storage` directory

```sh
bud build production --storage new/storage/dir
```

### Produce with an html template

```sh
bud build production --html
```

### Produce a manifest

```sh
bud build production --manifest
```
