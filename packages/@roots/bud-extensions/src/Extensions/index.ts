import {
  Module,
  Extensions as Contract,
  Service,
} from '@roots/bud-framework'
import {boundMethod as bind} from 'autobind-decorator'
import {isUndefined} from 'lodash'
import {Extension} from '../Extension/index'

export class Extensions extends Service implements Contract {
  public name = '@roots/bud-extensions'

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
    this.log(`Registering extension: %s`, extension.name)
    this.set(
      extension.name,
      new Extension(this.app, extension).register(),
    )
    this.log(`Extension registered: %s`, extension.name)
  }

  @bind
  public bootExtension(extension: Module): void {
    this.log(`Booting extension: %s`, extension.name)
    this.set(
      extension.name,
      this.get(extension.name).boot(this.app),
    )
  }

  @bind
  public add(extension: Module): void {
    this.log(`Adding extension: %s`, extension.name)
    this.registerExtension(extension)
    this.bootExtension(extension)
  }

  @bind
  public make(): Contract.PluginOutput[] {
    this.log(`Building extensions: %s`, this.getKeys())

    const plugins = this.getKeys()
      .map(name => this.get(name).make)
      .filter(
        ext => !isUndefined(ext),
      ) as Contract.PluginOutput[]

    return plugins
  }

  @bind
  public discard(pkg: string): Service['app'] {
    this.remove(pkg)
    return this.app
  }
}
