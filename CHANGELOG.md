# Changelog

For more information on any given release check the corresponding [bud.js.org `release` tag](https://bud.js.org/blog/tags/release)

## 5.4.0 (2022-02-22)

- 🎉 feature: @roots/eslint-config by @kellymears in https://github.com/roots/bud/pull/1020
- 🎉 feature: rule.includes as an array by @kellymears in https://github.com/roots/bud/pull/1179
- 🎉 feature: replace oclif with clipanion by @kellymears in https://github.com/roots/bud/pull/1153
- 🩹 fix: late extensions are assumed to be modules by @kellymears in https://github.com/roots/bud/pull/1140
- 🩹 fix: tailwindcss shouldn't throw when there is no config by @kellymears in https://github.com/roots/bud/pull/1141
- 🩹 fix: remove click interceptor instanceof check by @kellymears in https://github.com/roots/bud/pull/1150
- 🩹 fix: ci logging by @kellymears in https://github.com/roots/bud/pull/1158
- 🩹 fix: json logging errors by @kellymears in https://github.com/roots/bud/pull/1183
- 🩹 fix: @roots/bud-entrypoints option export by @kellymears in https://github.com/roots/bud/pull/1185
- 🩹 fix: devtool facade typings by @kellymears in https://github.com/roots/bud/pull/1186
- 🙌 improve: eslint/stylelint base config by @kellymears in https://github.com/roots/bud/pull/1134
- 🙌 improve: process logger by @kellymears in https://github.com/roots/bud/pull/1171
- 🙌 improve: @roots/sage preset by @kellymears in https://github.com/roots/bud/pull/1172
- 🙌 improve: cli backwards compatibility by @kellymears in https://github.com/roots/bud/pull/1180

## 5.3.2 (2022-02-11)

- [deps: update stylelint](https://github.com/roots/bud/commit/b7113341cfa521b185b0f104a6712785f46b3721) by @kellymears

## 5.3.1 (2022-02-10)

- fix(bud): ensure parallelism is at least 1cpu by default (Thanks @Pederytter) by @qwp6t [https://github.com/roots/bud/pull/1130](https://github.com/roots/bud/pull/1130)

## 5.3.0 (2022-02-09)

- fix(cli): `bud doctor` by @kellymears in [https://github.com/roots/bud/pull/1059](https://github.com/roots/bud/pull/1059)
- fix(cache): move webpack cache into subdir by @kellymears in [https://github.com/roots/bud/pull/1060](https://github.com/roots/bud/pull/1060)
- fix(dashboard): conditional dashboard imports by @kellymears in [https://github.com/roots/bud/pull/1067](https://github.com/roots/bud/pull/1067)
- fix(eslint): loader caching by @kellymears in [https://github.com/roots/bud/pull/1068](https://github.com/roots/bud/pull/1068)
- fix(build): check for valid browserslist before defining by @kellymears in [https://github.com/roots/bud/pull/1099](https://github.com/roots/bud/pull/1099)
- fix(server): do not inject proxy client fix into non-proxy app by @kellymears in [https://github.com/roots/bud/pull/1097](https://github.com/roots/bud/pull/1097)
- fix(server): type error: watcher undefined by @kellymears in [https://github.com/roots/bud/pull/1098](https://github.com/roots/bud/pull/1098)
- fix(copy-webpack-plugin): update interface by @QWp6t in [https://github.com/roots/bud/pull/1052](https://github.com/roots/bud/pull/1052)
- improve(framework): add exception handling by @kellymears in [https://github.com/roots/bud/pull/1053](https://github.com/roots/bud/pull/1053)
- improve(cli): `bud build` command by @kellymears in [https://github.com/roots/bud/pull/1063](https://github.com/roots/bud/pull/1063)
- improve(typescript): improved configuration by @kellymears in [https://github.com/roots/bud/pull/1062](https://github.com/roots/bud/pull/1062)
- improve(dashboard): rendering by @kellymears in [https://github.com/roots/bud/pull/1054](https://github.com/roots/bud/pull/1054) and [https://github.com/roots/bud/pull/1096](https://github.com/roots/bud/pull/1096)
- improve(react): general plugin improvements by @kellymears in [https://github.com/roots/bud/pull/1104](https://github.com/roots/bud/pull/1104)
- improve(api): improved `bud.assets` function by @kellymears in [https://github.com/roots/bud/pull/1114](https://github.com/roots/bud/pull/1114)

## 5.2.0 (2022-01-19)

- [Fix release branch push](https://github.com/roots/bud/commit/401450f8ef0b62f613085d3fcbe8f2b4381d33d8)
- [chore: 5.1.0 release post (](https://github.com/roots/bud/commit/2a12c04268a144b1d246817180d2912abbb26111)[#1001](https://github.com/roots/bud/pull/1001)[)](https://github.com/roots/bud/commit/2a12c04268a144b1d246817180d2912abbb26111)
- [renovate - target main (](https://github.com/roots/bud/commit/d03f711cec20b7db1c80c9d2b2e927338f825a1f)[#988](https://github.com/roots/bud/pull/988)[)](https://github.com/roots/bud/commit/d03f711cec20b7db1c80c9d2b2e927338f825a1f)
- [improve(dev) ci & dx (](https://github.com/roots/bud/commit/978ade20eee67d823e89358d312a771c920efc6e)[#1009](https://github.com/roots/bud/pull/1009)[)](https://github.com/roots/bud/commit/978ade20eee67d823e89358d312a771c920efc6e)
- [improve(server) proxy middleware (](https://github.com/roots/bud/commit/94a208a7a9edb7d0f304a08986c98424cc743831)[#1008](https://github.com/roots/bud/pull/1008)[)](https://github.com/roots/bud/commit/94a208a7a9edb7d0f304a08986c98424cc743831)
- [improve(bud) dependency strategy (](https://github.com/roots/bud/commit/898a54afdd11cd963526cd9b395c199e49d037fa)[#1005](https://github.com/roots/bud/pull/1005)[)](https://github.com/roots/bud/commit/898a54afdd11cd963526cd9b395c199e49d037fa)
- [fix(server) bud.watch (](https://github.com/roots/bud/commit/582c3f326802b8123f31175d6c2e79bb639c0717)[#1007](https://github.com/roots/bud/pull/1007)[)](https://github.com/roots/bud/commit/582c3f326802b8123f31175d6c2e79bb639c0717)
- [chore(deps): bump node-fetch to v3.1.1 [security]](https://github.com/roots/bud/commit/62ec26e7e5168b2e9d85856f267a9d2809dd677c)
- [chore(deps): bump @babel/core to v7.16.12](https://github.com/roots/bud/commit/4058fbab683c203ab208c5fe887fc741b7046965)
- [chore(deps): bump tailwindcss to v3.0.16](https://github.com/roots/bud/commit/0a895e5bcbd2b72632833c114c15ca2760756441)

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
