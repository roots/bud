---
description: Publish template files.
---

# Scaffolding project files

Bud core and extensions may provide templates to use in your project.

## Usage instructions

See a listing of available scaffolds:

```sh
bud publish:list
```

Publish a template:

```sh
bud publish [pkg name] [template filename]
```

Optionally, you can specify a path to publish to.
By default the template will be published to a `publish` directory in the root of your project.

```sh
bud publish [pkg name] [template filename] [filepath]
```

## Examples

Both of the following ship with Bud core:

### Starter configuration file

```sh
bud publish @roots/bud-support bud.config.js
```

### Starter HTML template

```sh
bud publish @roots/bud-support index.html
```
