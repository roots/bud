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
 * @core @packageDocumentation @betaDocumentation
 */

import cosmiconfigTsLoader from '@endemolshinegroup/cosmiconfig-typescript-loader'
import * as InkUseStyle from '@roots/ink-use-style'
import * as cosmiconfig from 'cosmiconfig'
import * as dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import Express from 'express'
import * as Ink from 'ink'
import InkGradient from 'ink-gradient'
import InkSpinner from 'ink-spinner'
import * as json5 from 'json5'
import * as Notifier from 'node-notifier'
import * as React from 'react'

import {chalk} from './external/chalk'
import * as globby from './external/globby'
import {pkgUp} from './external/pkg-up'
import {toml} from './external/toml'
import {yaml} from './external/yaml'
import {dump} from './util/dump'
import {killPort} from './util/killPort'
import * as wpPkgs from './util/wordpressPkgs'

export {dump}

export {killPort}

export {wpPkgs}

export {dotenv}

export {dotenvExpand}

export {globby}

export {Ink}

export {InkGradient}

export {InkSpinner}

export {InkUseStyle}

export {Notifier}

export {React}

export {Express}

export {chalk}

export {cosmiconfig}

export {cosmiconfigTsLoader}

export {pkgUp}

export {json5}

export {toml}

export {yaml}
