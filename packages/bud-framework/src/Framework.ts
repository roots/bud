import Container, {Loose} from '@roots/container'
import {
  Filesystem,
  FileContainerInterface,
} from '@roots/filesystem'
import {FrameworkInterface, Hooks} from './'
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
import {hooks} from './hooks'

class Framework implements FrameworkInterface {
  public disks: Filesystem

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
    this.disks = new Filesystem()

    this.apply = this.apply.bind(this)
    this.getDisk = this.getDisk.bind(this)
    this.makeDisk = this.makeDisk.bind(this)
  }

  public apply(key: PropertyKey, value: unknown): void {
    Object.defineProperty(this, key, value)
  }

  public makeContainer(repo?: Loose): Container {
    return new Container(repo ?? {})
  }

  public makeDisk(
    key?: string,
    baseDir?: string,
    glob?: string[],
  ): FileContainerInterface {
    return this.disks.set(key ?? 'primary', {baseDir, glob})
  }

  public getDisk(key?: string): FileContainerInterface {
    return this.disks.get(key ?? 'primary')
  }

  public makeHooks(app: FrameworkInterface): Hooks {
    return hooks(app)
  }
}

export {Framework as default, Loose, FrameworkInterface}
