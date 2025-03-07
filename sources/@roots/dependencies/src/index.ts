// Copyright © Roots Software LLC
// Licensed under the MIT license.

/**
 * Package management for yarn and npm.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 */

export {Npm, Yarn} from './command/index.js'
export {Dependencies} from './dependencies.js'

interface Install {
  (
    dependencies: Array<[string, string]>,
    args?: Array<string>,
  ): Promise<any>
}

interface Uninstall {
  (dependencies: Array<[string, string]>): Promise<any>
}

export interface IDependencyManager {
  execute: (commandArgs: Array<string>) => Promise<any>
  getLatestVersion(signifier: string): Promise<string>
  install: Install
  onMessage?: (message: string) => void
  path: string
  uninstall: Uninstall
}
