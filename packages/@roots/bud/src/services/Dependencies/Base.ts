import {Api, Dashboard, Service} from '@roots/bud-framework'
import {
  Dependencies as DependenciesManager,
  IDependencyManager,
} from '@roots/dependencies'

export abstract class Base extends Service {
  public name = 'service/dependencies'

  public manager: DependenciesManager

  public path: Api.Path

  public dashboard: Dashboard

  public abstract get pkg(): string

  public abstract get isYarn(): boolean

  public abstract get client(): IDependencyManager

  public abstract shouldInstall(
    dep: string,
    type: 'dependencies' | 'devDependencies',
  ): boolean

  /**
   * Install dependency
   */
  public abstract installDev(
    deps: string[],
    source: string,
  ): void

  /**
   * Install dependency
   */
  public abstract install(deps: string[], source: string): void

  /**
   * Display information to console
   */
  public abstract notify(dep: string, source: string): void
}
