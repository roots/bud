## v4.6.0

v4.6.0 extends the framework API with a new `.tap()` method, and it provides fixes for `@roots/bud-imagemin` as well as `bud.template()`.

### Breaking

- `@roots/bud-api` removes the `html-loader` when `bud.template()` is used.

### Improved

- `@roots/bud-framework` now has a `bud.tap()` method for running arbitrary callbacks without breaking the function chain.
- `@roots/bud` removes `html-webpack-harddisk-plugin` as a dependency.
- `html-webpack-plugin` has been moved from `@roots/bud` to `@roots/bud-api`, and it is only loaded when `bud.template()` is called.

### Fixed

- `@roots/bud-imagemin` now includes the correct default options for svgo.
- `@roots/bud-api` supports the `html-webpack-plugin` fallback EJS loader when `bud.template()` is called.

### Contributors

- kellymears <kelly@roots.io>
- QWp6t <hi@qwp6t.me>

## v4.5.0

v4.5.0 comes with a lot of internal improvements. There are some small changes to the postcss and imagemin apis, for users of those plugins.

### Breaking

- `@roots/bud-postcss` API has been streamlined a bit. The big change is that plugins are now keyed by a string, explicitly. Check the [`@roots/bud-postcss` README](https://github.com/roots/bud/blob/stable/packages/%40roots/bud-postcss/README.md) for usage.
- `@roots/bud-tailwindcss` no longer needs/utilizes the `@tailwindcss/jit` package. This streamlines the config, if you were specifying your configuration in your project's bud config file.
- `@roots/bud-imagemin`'s API has changed. If you were using the `bud.imagemin` config fn in your config file, you will need to update it. Check the [`@roots/bud-imagemin` README](https://github.com/roots/bud/blob/stable/packages/%40roots/bud-imagemin/README.md) for updated usage instructions.

### Improved

- No longer requires `@tailwindcss/jit`.

### Fixed

- `@roots/bud-imagemin`: It's no longer broken.

### Contributors

- kellymears <kelly@roots.io>
- QWp6t <hi@qwp6t.me>

## v4.4.0

v4.4.0 is primarily focused on improvements in `@roots/entrypoints-webpack-plugin` and `@roots/bud-dashboard`. It also includes fixes in `@roots/wordpress-dependencies-webpack-plugin` which could have resulted in incomplete asset processing.

### Breaking

- `@roots/entrypoints-webpack-plugin` should now be imported using the named export `EntrypointsWebpackPlugin`
- `@roots/wordpress-dependencies-webpack-plugin` should now be imported using the named export `WordPressDependenciesWebpackPlugin`

These import changes only effect users who are using the plugins independently of the framework.

### Fixed

- `@roots/wordpress-dependencies-webpack-plugin` fixes issues related to wordpress assets in child modules not being processed properly.

### Improved

- `@roots/entrypoints-webpack-plugin`: improved internals
- `@roots/bud-dashboard`: improved reporting

### Contributors

- kellymears <kelly@roots.io>
- QWp6t <hi@qwp6t.me>

## v4.3.0

v4.3.0 adds the `bud extensions` cli command. This is the recommended way to ensure peer dependencies are met when installing new extensions. After installing a bud extension, please run `bud extensions:install` (or its alias: `bud init`).

To see what all is being utilized in a project you can run `bud extensions:list`.

There are changes to the cli interface which wil be immediately noticable, but no changes to public-facing APIs.

This release also bumps dependencies to their most recent versions and includes numerous bug fixes.

### Added

- `bud extensions` command

### Improved

- `@roots/bud-typescript` only booted if peer dependencies are met
- `@roots/bud-postcss` only booted if peer dependencies are met
- `@roots/bud-react` only booted if peer dependencies are met
- `@roots/sage` loads extensions conditionally based on peer dependencies
- `--ci` should be much more reliable
- Builds should be significantly faster

### Fixed

- Hanging processes with cli commands
- plain js compilation (without transpilation) now works correctly (see [#82](https://github.com/roots/bud/issues/82))
- `@roots/bud-vue` fixed (loader incompatible with webpack's `oneOf`)
- Fixes errors when using memory based caching
- Fixes errors when using fs based caching

### Internals

- We are now using Jest for tests (h/t @QWp6t)
- Test: suite for `@roots/container`
- Test: suite for `@roots/bud-build`
- Test: several methods from `@roots/bud-api`

### Contributors

- kellymears <kelly@roots.io>
- QWp6t <hi@qwp6t.me>

## v4.2.0

v4.2.0 adds the [override](https://github.com/roots/bud/blob/stable/docs/config/override.md) method. Relatedly, there are two new hooks: `before` and `after`, which are called directly before and after the config is generated. Override is just a wrapper around `after`.

You can now specify publicPath using a callback. See the [setPublicPath docs](https://github.com/roots/bud/blob/stable/docs/config/setPublicPath.md).

By default, bud now uses a memory based cache implementation. Filesystem caching is still superior, but it is no longer the default implementation because of its inherent complexity (it may not work for all configs). We recommend that you try calling `bud.persist()` in your config file to see if filesystem caching works for your project. In the future, hopefully persistent caching can be made the default again.

### Added

- `override` method (parity with mix api)
- `before` hook (parity with mix api, used by `override`)
- `after` hook (parity with mix api)

### Improved

- `publicPath` may now be set with a function callback
- `persist` may be disabled/enabled at any point prior to compilation, as many times as wanted.
- Improved error display in the cli

### Removed

- Types: remaining definitions from `@roots/bud-typings` are no longer utilized

### Fixed

- Fatal errors for non git repos and git repos without commits
- Eslint extension caching when using `persist`
- @roots/sage: add @roots/bud-eslint plugin

## v4.1.0

This release changes the default cache strategy to `memory`, which is slower but more broadly compatible. If your setup is compatible with `filesystem` caching it is much faster and worth trying.

You can enable it by calling `bud.persist()` in your config or adding `persist: true` to your config yml/json, if configuring bud with a static config.

### Details

- allows variable expansion within `.env`
- utilizes memory strategy by default. filesystem can be enabled by calling `bud.persist()` in config.
- improved reliability of filesystem cache
- improved validation of filesystem cache

## v4.0.0

This release features breaking changes across all packages.

- Using css-minimizer-webpack-plugin instead of optimize-css-assets-webpack-plugin.
  - `optimize-css-assets-webpack-plugin` throws warnings. Docs say to use `css-minimizer-webpack-plugin` instead.
  - Commits: 5255c68, 578833c, 361a732.
- Removed `bud.vendor` method from `@roots/bud-api`. Replaced with `bud.splitChunks`.
- Removed keys from hooks/config:
  - `build/optimization/splitChunks/cacheGroups/vendor/...` (everything from here on is gone)
  - This means that users who wish to modify the `vendor` chunk either need to include the config keys between `splitChunks`
    and `vendor` in the config param of `bud.splitChunks`, or overwrite the config in total using `bud.hooks.on('build/optimization/splitChunks')`.
- `build/parallelism` value of `os.cpus().length - 1` (previously set to `1`)
- Removes `src`, `srcPath`, `dist`, `distPath`, `project` api fns in favor of a consolidated approach: `bud.path` and `bud.setPath`.
- Types are no longer exported explicitly from `@roots/bud-support` or `@roots/bud-typings`. Core interfaces/types can be exported from `@roots/bud-framework`.
- `@roots/bud-compiler` no longer derives its type definition from `@roots/bud-typings`. See: #48.
- `@roots/bud-build` no longer derives its type definition from `@roots/bud-typings`. See #48.
- updates all asset manifest plugins to use the `processAssets` hook. webpack 5 no longer allows assets to be modified during the compiler `emit` phase.
- Adds support for static config files (`yml` and `json`)
- Adds support for env specific config files (`bud.production.config.js`, `bud.development.config.yml`, etc.)
- Adds support for ts config files (ts is not required in the project to take advantage of this)
- Enhances docs generation/maintenance scripts
- Overhauls loader, rule interfaces

Contributors:

- kellymears <kelly@roots.io>
- QWp6t <hi@qwp6t.me>

## v2.0.7

affects: @roots/bud-api, @roots/bud-react

- docs(examples): example react spa configuration (#29) ([5dbc7ea](https://github.com/roots/bud/commit/5dbc7ea)), closes [#29](https://github.com/roots/bud/issues/29)
- docs(examples): example configurations ([6ce07e9](https://github.com/roots/bud/commit/6ce07e9))
- docs(README): include npm badges in README ([322fa6e](https://github.com/roots/bud/commit/322fa6e))
- docs(README): README and CHANGELOG updates ([1d58327](https://github.com/roots/bud/commit/1d58327))
- refactor(@roots/bud-react) (#28) ([aaee19c](https://github.com/roots/bud/commit/aaee19c)), closes [#28](https://github.com/roots/bud/issues/28)
- chore(codeclimate): codeclimate config ([8884bf6](https://github.com/roots/bud/commit/8884bf6))

## v2.0.6

affects: @roots/bud-wordpress-manifests

- fix(@roots/bud-wordpress-manifests) fixes packaging issue stemming from bad tsconfig refs

## v2.0.5

affects: @roots/bud, @roots/bud-typings

- feat(@roots/bud) add imagemin support (#26)

## v2.0.4

affects: @roots/bud, @roots/bud-cli, @roots/bud-support, @roots/bud-typings

- docs(@roots/bud) documentation improvements.
- improve(@roots/bud-cli) Better error messages/handling.
- fix(@roots/bud-support) Updates bud.config.js publishable template.
- chore(lab): remove dependencies (security vulnerabilities)
- chore(git): simplify PR template

## v2.0.3

affects: @roots/bud, @roots/bud-cli, @roots/bud-framework, @roots/bud-babel, @roots/bud-eslint, @roots/bud-postcss,
@roots/bud-purgecss, @roots/bud-react, @roots/bud-sass, @roots/bud-stylelint,
@roots/bud-tailwindcss, @roots/bud-vue, @roots/bud-wordpress-manifests

- fix(@roots/bud-cli): bin path fix
- chore(yarn): update lockfile
- fix(@roots/bud-cli): tsconfig.json fix

## 2.0.2

affects: @roots/bud-api, @roots/bud, @roots/bud-cli, @roots/filesystem

- feat(bud): add support for --debug flag and modifiable dump path
- fix(bud): ensure projectPath is set before srcPath and distPath
- feat(api): make bud.copy API work better for majority use case
- fix(cli): fix bud-cli bin path
- refactor(FileSystem): remove unused watchman dependency
- docs(bud): improve and update docs
- docs(bud): README additions and reordering

**Breaking Change**

`bud.copy` function modified. See [the documentation for updated usage](docs/config-copy.md).
