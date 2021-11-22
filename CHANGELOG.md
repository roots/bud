## v5.0.0 (2021-11-22)

Bud v5 comes with a lot of changes. Please [review the diff to see what's changed](https://github.com/roots/bud/compare/v4.6.0...v5.0.0).

### Breaking

- `bud.override` removed. If you want to override the config, use one of the 'build' hooks.
- `@roots/bud-cli` has been deprecated. Use `@roots/bud`.

### Added

- `bud.make` will create a new named child compiler for you to configure.
- `bud.get` will retrieve a previously made child compiler instance for further configuration.
- `bud.set` allows settings a compiler instance as a child compiler entry.
- `bud.parent` always returns the parent compiler. If called from the parent it will return itself.
- New CLI commands:
  - **bud clean:dist** - will remove dist directory and contents
  - **bud clean:storage** - will remove storage directory (.budfiles) and contents
  - **bud clean:all** - will remove both dist and storage
- New `bud build` flags:
  - **--target/-t** Target a specific compiler to be built in isolation. Can be passed multiple times to target more than one compiler.
  - **--cache/-c** Enable filesystem caching for builds.

### Improved

- **bud.use** now supports using Webpack plugins directly.
- The CLI has a fresh coat of paint and some performance related enhancements.
- New notification center integration (MacOS only)
- Added `@roots/yarn-plugin-kjo` to provide utilities in the `yarn kjo` namespace

### Internal

- `@roots/bud-typings` has been deprecated.

### Contributors

- kellymears kelly@roots.io
- QWp6t hi@qwp6t.me
