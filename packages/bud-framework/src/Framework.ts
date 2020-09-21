import Container, {Loose} from '@roots/container'
import Filesystem from '@roots/filesystem'
import {
  dump,
  format,
  pretty,
  highlight,
  logger,
  notify,
  processHandler,
  terminate,
} from './util'
import {hooks, Hooks} from './hooks'
import {FrameworkInterface} from './'

class Framework implements FrameworkInterface {
  public dump = dump

  public terminate = terminate

  public logger = logger

  public util = {
    dump,
    format,
    highlight,
    notify,
    pretty,
    processHandler,
    terminate,
  }

  public constructor() {
    this.apply = this.apply.bind(this)
  }

  public apply(key: PropertyKey, value: unknown): void {
    Object.defineProperty(this, key, value)
  }

  public makeContainer(repo?: Loose): Container {
    return new Container(repo ?? {})
  }

  public makeDisk(
    baseDir?: string,
    pattern?: string[],
  ): Filesystem {
    const disk = new Filesystem(baseDir ?? undefined)
    pattern && disk.setDisk(pattern)

    return disk
  }

  public makeHooks(app: FrameworkInterface): Hooks {
    return hooks(app)
  }
}

export {Framework as default, Loose, FrameworkInterface}
