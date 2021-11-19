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

/// <reference types="node" />

import {SpawnSyncReturns} from 'child_process'

export declare class Dependencies {
  path: string
  constructor(path?: string)
  get client(): IDependencyManager
  isYarn(): boolean
}

export declare interface IDependencyManager {
  path: string
  install(
    dev: boolean,
    dependency: string,
  ): SpawnSyncReturns<string>
  uninstall(dependency: string): SpawnSyncReturns<string>
}

export declare class Npm implements IDependencyManager {
  path: string
  constructor(path?: string)
  install(
    dev: boolean,
    dependency: string,
  ): SpawnSyncReturns<string>
  uninstall(dependency: string): SpawnSyncReturns<string>
}

export declare class Yarn implements IDependencyManager {
  path: string
  constructor(path?: string)
  install(
    dev: boolean,
    dependency: string,
  ): SpawnSyncReturns<string>
  uninstall(dependency: string): SpawnSyncReturns<string>
}

export {}
