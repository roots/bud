// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * This package is a collection of internal dependencies utilized by the build system.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * This package is bundled with \@vercel/ncc. Sometimes type definitions can be a little iffy.
 *
 * It is recommended for extension authors to include their type definitions separately. You can
 * ensure that these packages are included in the runtime by specifying your type imports with
 * `import type` syntax.
 *
 * @remarks
 * - 💁 Composable - Build exceptional applications with a modular, configurable build system
 *
 * - 💪 Modern - Modern framework written in TypeScript with an expressive API
 *
 * - 🌱 Easy - Low bundle size and fast build times
 *
 *  @packageDocumentation
 */

/**
 * Dependencies
 */
//

export * from './external/boxen'
export {chalk} from './external/chalk'
export * from './external/cosmiconfig'
export * from './external/cli-highlight'
export * from './external/dotenv'
export * from './external/dotenv-expand'
export * from './external/execa'
export * from './external/pretty-format'
export * from './external/fs-extra'
export * from './external/globby'
export * from './external/human-readable'
export * from './external/json5'
export * from './external/lodash'
export * from './external/nanoid'
export * from './external/node-notifier'
export * from './external/pkg-up'
export * from './external/safe-resolve'
export * from './external/safe-require'
export * from './external/safe-json-stringify'
export * from './external/signale'
export * from './external/toml'
export * from './external/yaml'
export * from './external/table'

/**
 * Utilities
 */
//

export * from './util/dump'
export * from './util/killPort'
export * as wpPkgs from './util/wordpressPkgs'

/**
 * Decorators
 */
//

export * from './external/helpful-decorators'
