import Framework from '@roots/bud-typings'
import {FileContainer, FileSystem} from '@roots/filesystem'
import {Container} from '@roots/container'
import {Mode} from './Mode'
import * as util from './util'

export {Bud, Bud as default}

class Bud implements Framework.Bud.Core {
  public registry: Framework.Container

  public disk: Framework.FileSystem

  public fs: Framework.FileContainer

  public build: Framework.Build.Contract

  public hooks: Framework.Hooks.Contract

  public mode: Framework.Mode.Contract

  public logger: Framework.Logger.Contract = util.logger

  public constructor(
    registrables: Framework.Bud.ConstructorParameters,
  ) {
    this.makeContainer = this.makeContainer.bind(this)
    this.registry = this.makeContainer(registrables)
  }

  public makeContainer(repository?: {
    [key: string]: any
  }): Framework.Container {
    return new Container(repository)
  }

  public makeDisk(
    name: string,
    dir: string,
    glob?: string[],
  ): void {
    this.disk.set(name, {
      base: this.fs.path.resolve(__dirname, dir),
      glob: glob ?? ['**/*'],
    })
  }

  public init(
    this: Framework.Bud.Contract,
  ): Framework.Bud.Contract {
    this.disk = new FileSystem()

    this.fs = new FileContainer(process.cwd())

    this.mode = new Mode(this)

    return this.disks().register().boot()
  }
}
