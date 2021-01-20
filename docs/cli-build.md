---
description: Compile project assets by running bud.config.js with Node.
---

# Compiling assets

Assets are compiled with the bud cli's `build` command.

```sh
bud build
```

If run without any arguments it is the equivalent of entering:

```sh
bud build --mode production --manifest --cache
```

Many options are booleans:

```sh
# true
bud build --arg

# true
bud build --arg true

# false
bud build --arg false
```

Some arguments are strings:

```sh
# 'value'
bud build --arg value
```

Some arguments are arrays:

```sh
# ['value', 'foo']
bud build --arg value foo

# ['foo', 'value']
bud build --arg foo --arg value
```

Any argument key/value pairings can also be expressed with `=`,
and strings can be explicitly deliniated with `"`s:

```sh
bud build --arg=true

bud build --arg="value1" --arg="another value"
```

## Arguments

### Compiling in `production` mode

```sh
bud build --mode production
```

### Compiling in `development` mode

```sh
bud build --mode development
```

### Run in CI mode

Simpler output for better compatibility and build artifacts.

```sh
bud build --ci
```

### Debugging

Dumps extra information and build objects to disk (`.bud/records`).

```sh
bud build --debug
```

### Logging

Log verbose output for debugging

```sh
bud build --log
```

### Autodiscover

Automatically discover and utilize installed packages.

```sh
bud build --autodiscover
```

### Minify assets

```sh
bud build --minify
```

### Hash compiled asset filenames

```sh
bud build --hash
```

### Produce a `vendor` bundle

```sh
bud build --vendor
```

### Produce a `runtime` bundle

```sh
bud build --runtime
```

### Specify a devtool (source-maps)

```sh
# Enable source-maps
bud build --devtool

# Specify a specific devtool
bud build --devtool cheap-eval-source-map
```

### Specify `project` directory

```sh
bud build --project /absolute/path/to/project
```

### Specify `src` directory

```sh
bud build --src resources
```

### Specify `dist` directory

```sh
bud build --dist distributables
```

### Specify `node_modules` directory

```sh
bud build --modules ../path-to-node_modules
```

### Specify `storage` directory

```sh
bud build --storage new/storage/dir
```

### Produce with an html template

```sh
bud build --html
```

### Produce a manifest

```sh
bud build --manifest
```
