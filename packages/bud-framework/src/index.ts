import Bud from '@roots/bud-types'
import Container, {Loose} from '@roots/container'
import {
  Filesystem,
  FileContainerInterface,
} from '@roots/filesystem'
import {format, pretty, logger} from './util/index'
import {hooks} from './hooks'

export default class {
  public disks: Bud['disks']

  public logger = logger

  public util = {
    format,
    pretty,
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

  public makeHooks(bud: Bud): Bud['hooks'] {
    return hooks(bud)
  }
}
