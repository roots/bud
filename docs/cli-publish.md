---
description: Publish template files.
---

# Scaffolding project files

Bud core and extensions may provide templates to use in your project.

By default Bud provides an HTML template starter and a `bud.config.js` starter.

Published templates will be written to a `publish` directory in your project root.

## Usage instructions

```sh
bud publish {extension name} {template}
```

See a listing of available scaffolds

```sh
bud
```

```sh
bud publish --help
```

## Starter configuration file

```sh
bud publish @roots/bud-support bud.config.js
```

## Starter HTML template

```sh
bud publish @roots/bud-support index.html
```
