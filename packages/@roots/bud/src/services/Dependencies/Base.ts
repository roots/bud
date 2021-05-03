import {Service} from '@roots/bud-framework'
import {Dependencies as DependenciesManager} from '@roots/dependencies'

export abstract class Base extends Service {
  public name = 'service/dependencies'

  public manager: DependenciesManager

  public abstract pkg(): string

  public abstract shouldInstall(
    dep: string,
    type: 'dependencies' | 'devDependencies',
  ): boolean

  /**
   * Install dependency
   */
  public abstract installDev(
    deps: {[key: string]: string},
    src: string,
  ): void

  /**
   * Install dependency
   */
  public abstract install(
    deps: {[key: string]: string},
    src: string,
  ): void

  /**
   * Display information to console
   */
  public abstract notify(
    notices: {msg: string; src: string}[],
  ): void
}
