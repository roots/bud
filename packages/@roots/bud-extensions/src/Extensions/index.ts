import {
  Module,
  Extensions as Contract,
  Service,
} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isUndefined, isEqual} from 'lodash'
import {Extension} from '../Extension/index'

export class Extensions extends Service implements Contract {
  public name = 'extensions'

  @bind
  public register(): void {
    this.every((_name: string, extension: Module) => {
      return this.registerExtension(extension)
    })
  }

  @bind
  public boot(): void {
    this.every((_name: string, extension: Module) => {
      return this.bootExtension(extension)
    })
  }

  @bind
  public registerExtension(extension: Module): void {
    this.set(
      extension.name,
      new Extension(this.app, extension).register(),
    )
  }

  @bind
  public bootExtension(extension: Module): void {
    this.set(
      extension.name,
      this.get(extension.name).boot(this.app),
    )
  }

  @bind
  public add(extension: Module): void {
    this.registerExtension(extension)
    this.bootExtension(extension)
  }

  @bind
  public make(): Contract.PluginOutput[] {
    const plugins = this.getKeys()
      .map((name: string): Module | undefined => {
        const extension = this.get(name)

        const isPlugin =
          !isEqual(extension.when, false) && extension.apply

        return isPlugin ? extension : extension.make
      })
      .filter(
        (ext: Module | undefined) => !isUndefined(ext),
      ) as Contract.PluginOutput[]

    return plugins
  }
}
