// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Package management for yarn and npm.
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

export {Npm, Yarn} from './command/index.js'
export {Dependencies} from './dependencies.js'

interface Install {
  (
    dependencies: Array<[string, string]>,
    args?: Array<string>,
    onMessage?: (message: string) => void,
    onError?: (message: string) => void,
  ): Promise<any>
}

interface Uninstall {
  (
    dependencies: Array<[string, string]>,
    onMessage?: (message: string) => void,
  ): Promise<any>
}

export interface IDependencyManager {
  onMessage?: (message: string) => void
  getLatestVersion(signifier: string): Promise<string>
  path: string
  install: Install
  uninstall: Uninstall
}
