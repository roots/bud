// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * A high-level virtual filesystem.
 */

import Filesystem from './filesystem.js'
import {S3} from './s3/index.js'

export {Filesystem, Filesystem as FS, S3}

export * as json from './json.js'
export * as yml from './yml.js'
