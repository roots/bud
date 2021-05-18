## v4.0.0

This release features breaking changes across all packages.

- Using css-minimizer-webpack-plugin instead of optimize-css-assets-webpack-plugin. 
  - `optimize-css-assets-webpack-plugin` throws warnings. Docs say to use `css-minimizer-webpack-plugin` instead.
  -  Commits: 5255c68, 578833c, 361a732. 
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

Authored by: 
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
