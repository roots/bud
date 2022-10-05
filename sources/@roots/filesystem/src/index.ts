// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * A simple, high-level virtual filesystem.
 *
 * @beta
 * This package is provided as-is.
 *
 * @packageDocumentation
 */

import S3 from './s3/index.js'

export * from './directories.js'
export * from './filesystem.js'
export * as json from './json.js'
export * as yml from './yml.js'

export {S3}
