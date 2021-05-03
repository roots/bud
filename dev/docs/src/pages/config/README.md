# Configuration

There are several paths to configuring your project. It is fine to mix and match.

Applicable configs are applied one-by-one, with each subsequent config modifying the results of previous configs.

This is the order you can anticipate:

- static configs
- env specific static configs
- builder configs
- env specific builder configs
- cli arguments

CLI arguments are applied last (to make it easier to experiment on top of an existing config from the command-line).

## Config builder

- `bud.config.js`
- `bud.config.ts`

Protip: you do not need to be utilizing typescript in your project in order to take advantage of a typescript config.

## Static configs

- `bud.config.json`
- `bud.config.yml`

## Development specific configs

- `bud.config.development.ts`
- `bud.config.development.js`
- `bud.config.development.json`
- `bud.config.development.yml`

## Production specific configs

- `bud.config.production.ts`
- `bud.config.production.js`
- `bud.config.production.json`
- `bud.config.production.yml`
