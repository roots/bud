import {Service} from './Service'

/**
 * A Bud related peer dependency
 */
interface Buddy {
  /**
   * The module/extension which uses this peer
   */
  source: string
  /**
   * The peer module name
   */
  name: string
  /**
   * The peer module version
   */
  ver: string
  /**
   * The peer module type
   */
  type: 'dependencies' | 'devDependencies'
}

interface Repository {
  name: string

  peers: {
    [key: string]: Buddy
  }

  extensions: {
    [key: string]: Buddy
  }

  dependencies: {
    [key: string]: string
  }

  devDependencies: {
    [key: string]: string
  }
}

/**
 * Peer dependencies
 */
interface Peers {
  /**
   * Project instance.
   */
  project: Project

  /**
   * Collect packages.
   */
  discover(type: 'dependencies' | 'devDependencies'): void

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
   * Plumbs project dependencies and gathers data
   * on bud related modules
   */
  discover(type: 'dependencies' | 'devDependencies'): this

  /**
   * Registers all bud related extensions with bud.extensions
   */
  registerDiscovered(): void

  /**
   * Install packages
   */
  install(): void
}

abstract class Project extends Service<Repository> {
  /**
   * Array of paths for webpack to resolve modules from
   */
  public resolveFrom: string[] = []

  /**
   * Peer module related utilities
   */
  public abstract peers: Peers

  /**
   * Get aggregated project info
   */
  public abstract getProjectInfo(): {
    [key: string]: any
  }

  /**
   * Returns a boolean representing if
   * the project has a given pkg listed as a dependency
   * or devDependency
   */
  public abstract hasPeerDependency(pkg: string): boolean
}

export {Project}
