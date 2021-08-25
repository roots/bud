import {Service} from '@roots/bud-framework'
import {Dependencies as DependenciesManager} from '@roots/dependencies'
declare class Dependencies extends Service<null> {
  name: string
  /**
   * Interfaces with package manager
   */
  manager: DependenciesManager
  register(): void
  readProjectJson(): any
  shouldInstall(dep: string): boolean
  install(
    deps: {
      name: string
      ver: string
      source: string
      type: 'devDependencies' | 'dependencies'
    }[],
  ): void
}
export {Dependencies}
//# sourceMappingURL=index.d.ts.map
