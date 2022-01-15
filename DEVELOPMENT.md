# Developing Bud

This guide is a work-in-progress

#### Table Of Contents

- [Requirements](#requirements)
- [Getting started](#getting-started)
- [Repository layout](#repository)
- [Dev CLI](#cli)
- [Proxying](#proxying)
- [Documentation](#documentation)
- [Core packages](#core-packages)

## Requirements

Bud is developed using docker. As long as you have docker you should be fine.

Bud is compatible with x86 and arm architectures.

## Getting started

vscode isn't a requirement to develop bud, but it is the easiest way to get in without much friction.

There is a vscode devcontainer configuration in `./devcontainer` which is useful for developing bud. You should be prompted to restart vscode inside the container context when you first open the project. Doing so will automatically build all the project files. Opening a vscode terminal allows you to run commands within the container.

It comes preconfigured with prettier, eslint, and support for yarn 3's typescript plugin.

## Repository layout

- `.devcontainer`: vscode specific container configuration
- `.github`: github specific configuration
- `.vscode`: vscode editor specific configuration
- `config`: tooling configuration (eslint, prettier, tsc, etc)
- `dev`: build scripts
  - `compile`: script to compile public packages into single file bundles (@vercel/ncc)
  - `docker`: dockerfiles and container scripts
  - `jest`: jest setup scripts
  - `readme`: readme generator
  - `site`: bud docs scripts
  - `yarn`: yarn berry plugins, patches, sdks, etc
- `examples`: usage examples. these packages are also used for integration testing.
- `sources`: source code
  - `@roots`: public packages
  - `deprecated`: deprecated packages
  - `docs`: docusaurus site files
  - `roots-notifier`: macos notifier integration
  - `yarn-plugin-bud`: `@bud` yarn plugin source
- `tests`: jest test specs and snapshots
  - `integration`: integration tests
  - `unit`: unit tests
  - `util`: testing utilities and scripts

## CLI

The `@bud` CLI is a yarn plugin for managing the development environment and running project tasks.

Note that most `@bud` commands require being executed within the container. The command will fail if you try to run it on your host machine.

If you run `yarn --help` you can find a listing of all the commands under the `@bud` category.

Common tasks:

- `yarn @bud build`: build all packages. this command passes through all options/flags to `tsc`.
- `yarn @bud test`: run all tests. this command passes through all options/flags to `jest`.
- `yarn @bud lint`: run all linters.

## Proxying

bud.js uses [verdaccio](https://verdaccio.org/) to serve packages locally for testing.

The proxy runs on port 4873. There is a web interface at [http://localhost:4873/](http://localhost:4873).

## Documentation

bud.js documentation is generated with [docusaurus](https://docusaurus.io/). You can use the `@bud` CLI to run tasks related to documentation.

Check out `yarn @bud docs --help` for more information.

All site files are housed in `./sources/docs`.

In addition, there are build scripts related to docs generation in `./dev/site`. These scripts are located in a different directory to avoid conflicts between docusaurus and other tools.

### Writing docblocks for generated documentation

API documentation is generated with [api-extractor](https://api-extractor.com/). You should not manually edit the API documentation at `./sources/docs/api`. It will be overwritten.

When writing typescript for a bud.js package you should try and label exported symbols with either `@public` or `@private`. TS symbols labeled with `@public` will be included in built docs. TS symbols labeled with `@private` are not exposed to the public API and will not be included in built docs.

You should also consider using other tags supported by api-extractor: `@params`, `@returns`, `@remarks`, `@decorator` and `@example`. An ideal comment block has:

- a simple single-line description
- followed by a longer `@remarks` section, if appropraite.
- an `@example` block showing how the export is used.
- `@params` and `@returns` sections describing the parameters and return values (for functions, and methods).
- the `@decorator` block can be used if you are using a decorator. bud.js makes extensive use of the `@bind` decorator from `helpful-decorators`.

Example:

````typescript
/**
 * Sums two numbers
 *
 * @remarks
 * It is actually probably unncessary to have a remarks
 * section for this function since it is so simple.
 *
 * @example
 * ```ts
 * const example = (a: number, b: number) => a + b
 * ```
 *
 * @params a - the first number
 * @params b - the second number
 * @returns the sum of the two numbers
 *
 * @public
 */
function sum: (a: number, b: number) => number = sum(a, b) {
  return a + b
}
````

This isn't strictly enforced but it is nice. Adding docblocks to undocumented symbols is a very endearing and helpful way to contribute to the project.

### READMEs

Don't edit READMEs directly. They are generated in `./dev/readme` from templates in `./dev/readme/templates`. The templating engine is a react renderer and sort of like an inverted `mdx` (in that it takes react-ish markup and generates markdown from it).

## Core packages

- @roots/bud-api
- @roots/bud-build
- @roots/bud-cache
- @roots/bud-dashboard
- @roots/bud-extensions
- @roots/bud-framework
- @roots/bud-hooks
- @roots/bud-server
- @roots/bud-support

### @roots/bud-framework

This package is core to all of bud.js. Its exports, particularly its types, interfaces, and abstract classes are used by almost all other packages. When writing a package for bud.js you will, in all likelihood, be implementing against interfaces exported by this package.

Structuring your package with this package as a dependency will help ensure that your package is compatible with bud.js.

You can find many examples of using the interfaces exported from this package in any of the core bud packages or extensions.
