# Changelog

## v5.1.0 (2022-01-19)

- [fix(deps): bump image-minimizer-webpack-plugin to v3](https://github.com/roots/bud/pull/867)
- [fix(framework): fixed font rule](https://github.com/roots/bud/pull/860)
- [fix(bud-eslint): use @babel/eslint-parser](https://github.com/roots/bud/pull/892)
- [feature(entrypoints-webpack-plugin): option to emit as html](https://github.com/roots/bud/pull/893)
- [improve(bud-eslint): modularize eslint configs](https://github.com/roots/bud/pull/899)
- [fix(framework) directory for emitted assets](https://github.com/roots/bud/pull/900)
- [feat(framework) support webp](https://github.com/roots/bud/pull/901)
- [fix(sage) public path](https://github.com/roots/bud/pull/904)
- [fix(bud-purgecss)](https://github.com/roots/bud/pull/905)
- [fix(framework) module import/registration order](https://github.com/roots/bud/pull/906)
- [fix(framework) bud.assets: do not emit to assets dir](https://github.com/roots/bud/pull/912)
- [fix(framework) module import/registration order](https://github.com/roots/bud/pull/922)
- [improve(sage) dependencies removed from extension](https://github.com/roots/bud/pull/924)
- [fix(framework) assets in nested directories](https://github.com/roots/bud/pull/925)
- [fix(framework) fix inject client script for zero entry compilers](https://github.com/roots/bud/pull/937)
- [fix(framework) fix sourcemap warning](https://github.com/roots/bud/pull/938)
- [fix(sage) hmr fixes](https://github.com/roots/bud/pull/945)
- [improve(framework): automated releases](https://github.com/roots/bud/pull/978)

### Contributors

Thanks to everyone who contributed to this release!

- [kellymears](kelly@roots.io)
- [QWp6t](hi@qwp6t.me)
- [benword](ben@roots.io)
- [swalkinshaw](scott@roots.io)
- [austinpray](austin@austinpray.com)

## v5.0.0 (2021-11-22)

Bud v5 comes with a lot of changes. Please [review the diff to see what's changed](https://github.com/roots/bud/compare/v4.6.0...v5.0.0).

**The most important change**
You no longer need to explicitly require an extension in your configuration file or call `bud.use` to load it. Bud will automatically load the extensions you have installed.

### Breaking

- `@roots/bud-cli` has been deprecated. CLI functionality is packaged with `@roots/bud`.
- `bud.use` method is now asynchronous.
- `bud.build.make` method is now asynchronous.
- Hook key `build` now refers to an asynchronous filter.
- Hook key `build.plugins` now refers to an asynchronous filter.
- `bud.extensions.enqueue` can be used to enqueue a plugin and returns Bud instance for chaining.
- `@roots/bud` no longer exports `Framework`. Use `Bud` or import `Framework` from `@roots/bud-framework` instead.

### Added

- Yaml, json5 and TypeScript config file support.

- Multi-compiler support:

  - `bud.make` will create a new Bud instance for you to configure.
  - `bud.get` will retrieve a previously made child instance for further configuration.
  - `bud.set` allows setting a Bud instance as a `bud.children` entry.
  - `bud.root` always returns the parent compiler. If called from the parent it will return itself.
  - `bud.isRoot` will be true in the parent context.
  - `bud.hasChildren` will be true in the parent context if there are child Bud instances.

- Several new hooks:

  - `event.build.make.before` is called just before the webpack config is created (async).
  - `event.build.make.after` is called just after the webpack config is created (async).
  - `event.compiler.before` is called just before the final config is passed to webpack.
  - `event.compiler.after` is called just after the final config is passed to webpack.

- New CLI commands:

  - **bud clean** - removes dist and cache files
  - **bud doctor** - check for missing peer dependencies and configuration errors
  - **bud install** - automatically install/update required dependencies
  - **bud serve** - start the development server and initiate hot module reloading

- New `bud build` flags:

  - **--target** Target a specific Bud instance to be built in isolation. Can be passed multiple times to target more than one compiler.
  - **--[no]-cache** Toggle filesystem caching. [default: `true`]
  - **--cache.type** Set the cache type. Can be `filesystem` or `memory`. [default: `filesystem`]
  - **--location.[src|dist|project|storage]** Set a project disk location
  - **--[no]-log** - Toggle logging [default: `true`]
  - **--[no]-log.level** - Set logging level (`v`, `vv`, `vvv`, `vvvv`) [default: `vvv`]
  - **--[no]-log.papertrail** - Allow logger lines to overwrite the previous line from the same scope [default: `--no-log.papertrail`]
  - **--log-secret** - Suppress a string from logger output (can use multiple times) [default: `--log-secret {cwd}`]
  - **--[no]-dashboard** - Toggle the bud dashboard [default: `--dashboard`]
  - ...many more! add **--help** after any command to see what options are available.

- [example project](https://github.com/roots/bud/tree/main/examples/webpack-plugin) demonstrating how to use off-the-shelf webpack plugins with `bud.use`

### Improved

- Greatly improved performance. The entire Bud lifecycle is asynchronous.
- Installed extensions are now automatically registered and booted.
- Peer dependency requirements are now checked. Missing dependencies will not throw an error but will be logged.
- **bud.use** now supports using Webpack plugins directly.
- Informative logging.
- The CLI and dashboard have a fresh coat of paint.
- New notification center integration (MacOS only)
- Dashboard warnings and errors are now better displayed in the console.

## Fixed

- **bud.proxy** - fixed proxy interceptor
- **bud.serve** - fixed development server public path
- **bud.serve** - disables module hashing in development mode. this is enforced

### Internal

- `@roots/bud-typings` has been deprecated.
- Added [`@roots/yarn-plugin-kjo`](https://github.com/roots/bud/tree/main/dev/@bud) to provide utilities in the `yarn @bud` namespace.

## Extension specific notes

The following notes only apply to specific extensions:

- [`@roots/bud-tailwindcss`](https://github.com/roots/bud/tree/main/sources/@roots/bud-tailwindcss) - updated to version 3.
- [`@roots/bud-sass`](https://github.com/roots/bud/tree/main/sources/@roots/bud-sass) - uses `postcss-scss` to avoid syntax conflicts between sass and postcss.

## Contributors

- [kellymears](kelly@roots.io)
- [QWp6t](hi@qwp6t.me)
- [benword](ben@roots.io)
