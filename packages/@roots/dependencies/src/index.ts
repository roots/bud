// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Easy programmatic package management for yarn and npm.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional web applications using a modular, hackable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @extension @packageDocumentation @betaDocumentation
 */

import {SpawnSyncReturns} from 'child_process'

export {Npm} from './npm'
export {Yarn} from './yarn'
export {Dependencies} from './dependencies'

export interface IDependencyManager {
  path: string
  install(
    dev: boolean,
    dependency: string,
  ): SpawnSyncReturns<string>
  uninstall(dependency: string): SpawnSyncReturns<string>
}
