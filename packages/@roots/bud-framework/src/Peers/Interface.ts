import * as Project from '@roots/bud-framework/src/Project'

/**
 * Peer dependencies
 */
export interface Interface {
  /**
   * Project instance.
   */
  project: Project.Interface

  /**
   * Collect packages.
   */
  discover(type: 'dependencies' | 'devDependencies'): this

  /**
   * Register discovered packages as extensions
   */
  registerDiscovered(): void

  /**
   * Returns path for a module name (if findable)
   */
  resolvePeerByName(name: string): string

  /**
   * Returns manifest for a module from name (if findable)
   */
  getPeerManifest(name: string): {[key: string]: any}

  /**
   * Returns true if a module is a bud
   */
  isExtension(name: string): boolean

  /**
   * Registers all bud related extensions with bud.extensions
   */
  registerDiscovered(): void

  /**
   * Install packages
   */
  install(): void
}
