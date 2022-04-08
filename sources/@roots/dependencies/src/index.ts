// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Easy programmatic package management for yarn and npm.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @remarks
 * - 💁 Composable - Build exceptional web applications using a modular, hackable build system
 * - 💪 Modern - Modern framework that scales from a single file to thousands of lines of code
 * - 🌱 Easy - Low bundle size and fast build times with little to no configuration
 *
 * @packageDocumentation
 */

export {Npm, Yarn} from './command'
export {Dependencies} from './dependencies'

interface Install {
  (
    dependencies: Array<string | [string, string]>,
    dev?: boolean,
    onMessage?: (message: string) => void,
  ): Promise<any>
}

interface Uninstall {
  (
    dependencies: Array<string | [string, string]>,
    onMessage?: (message: string) => void,
  ): Promise<any>
}

export interface IDependencyManager {
  onMessage?: (message: string) => void
  path: string
  install: Install
  uninstall: Uninstall
}
