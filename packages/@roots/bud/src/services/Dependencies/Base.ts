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

  public abstract install(
    deps: [
      {
        name: string
        ver: string
        source: string
        type: 'dependencies' | 'devDependencies'
      },
    ],
  ): void

  public abstract notify(
    notices: {msg: string; src: string}[],
  ): void
}
