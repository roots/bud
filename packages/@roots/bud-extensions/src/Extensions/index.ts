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
      return this.add(extension)
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
    this.set(extension.name, this.get(extension.name).register())
  }

  @bind
  public bootExtension(extension: Module): void {
    this.set(extension.name, this.get(extension.name).boot())
  }

  @bind
  public add(extension: Module): void {
    this.set(extension.name, new Extension(this.app, extension))
    this.registerExtension(extension)
    this.bootExtension(extension)
  }

  @bind
  public make(): Contract.PluginOutput[] {
    return this.getValues()
      .map((extension: Module) => {
        const isPlugin =
          !isEqual(extension.when, false) && extension.apply

        return isPlugin ? extension : extension.make
      })
      .filter(
        (ext: Module | undefined) => !isUndefined(ext),
      ) as Contract.PluginOutput[]
  }
}
