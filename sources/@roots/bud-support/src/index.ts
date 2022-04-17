// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * This package is a collection of internal dependencies utilized by the build system.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @remarks
 * This package is bundled with \@vercel/ncc. Sometimes type definitions can be a little iffy.
 *
 * It is recommended for extension authors to include their type definitions separately. You can
 * ensure that these packages are included in the runtime by specifying your type imports with
 * `import type` syntax.
 *  @packageDocumentation
 */

export * from './external/boxen'
export * from './external/chalk'
export * from './external/chokidar'
export * from './external/cosmiconfig'
export * from './external/cli-highlight'
export * from './external/dotenv'
export * from './external/dotenv-expand'
export * from './external/execa'
export * from './external/pretty-format'
export * from './external/fs-extra'
export * from './external/get-port'
export * from './external/globby'
export * from './external/human-readable'
export * from './external/import-cwd'
export * from './external/import-from'
export * from './external/json5'
export * from './external/lodash'
export * from './external/nanoid'
export * from './external/parse-semver'
export * from './external/pkg-up'
export * from './external/resolve-cwd'
export * from './external/resolve-from'
export * from './external/resolve-global'
export * from './external/resolve-pkg'
export * from './external/safe-resolve'
export * from './external/safe-require'
export * from './external/safe-json-stringify'
export * from './external/signale'
export * from './external/strip-ansi'
export * from './external/toml'
export * from './external/yaml'
export * from './external/table'

export * from './util/dump'
export * from './util/killPort'

export * as figures from './util/figures'
export * as wpPkgs from './util/wordpressPkgs'
export * as parsers from './parsers'

export * from './decorators'
