import {
  Discovery as Contract,
  Framework,
  Service,
} from '@roots/bud-framework'
interface Buddy {
  source: string
  name: string
  ver: string
  type: 'dependencies' | 'devDependencies'
}
interface Repository extends Framework.Index {
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
declare class Discovery
  extends Contract
  implements Service<Repository>
{
  name: string
  repository: Repository
  /**
   * Array of paths for webpack to resolve modules from
   */
  resolveFrom: string[]
  registered(): void
  /**
   * Returns all gathered project data
   *
   * @decorator `@bind`
   */
  getProjectInfo(): {
    [key: string]: any
  }
  /**
   * Returns true if a dependency is listed in the project manifest
   *
   * @decorator `@bind`
   */
  hasPeerDependency(pkg: string): boolean
  /**
   * Returns path for a module name (if findable)
   */
  resolveModuleByName(name: string): string
  /**
   * Returns manifest for a module from name (if findable)
   */
  resolveManifestByName(name: string): any
  /**
   * Returns true if a module is a bud
   */
  isModuleExtension(name: string): boolean
  /**
   * Plumbs project dependencies and gathers data
   * on bud related modules
   */
  discover(type: 'dependencies' | 'devDependencies'): Discovery
  /**
   * Registers all bud related extensions with bud.extensions
   */
  registerDiscovered(): void
  /**
   * Installs all required peer dependencies
   */
  install(): void
}
export {Discovery}
//# sourceMappingURL=index.d.ts.map
