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
