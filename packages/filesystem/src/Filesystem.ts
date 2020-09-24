import __ from 'lodash'
import {resolve} from 'path'

import Container, {
  ContainerInterface,
  Item,
} from '@roots/container'

import FileContainer from './FileContainer'
import {FileContainerInterface} from './'

class Filesystem extends Container {
  constructor() {
    super()
  }

  public get(this: ContainerInterface, key: string): Item {
    return __.get(this.repository, key)
  }

  public set(
    this: ContainerInterface,
    key: string,
    options: {
      baseDir: string
      glob: string[]
    },
  ): FileContainerInterface {
    const disk = new FileContainer(options.baseDir)
    const glob = options.glob.map(item =>
      resolve(options.baseDir, item),
    )

    glob.push(`!${resolve(options.baseDir, '**/types/**/*')}`)
    glob.push(`!${resolve(options.baseDir, '**/*.map')}`)
    glob.push(`!${resolve(options.baseDir, '**/*.d.ts')}`)
    glob.push(
      `!${resolve(options.baseDir, '**/node_modules/**/*')}`,
    )
    glob.push(`!${resolve(options.baseDir, '**/vendor/**/*')}`)

    disk.setDisk(glob)

    this.repository[key] = disk

    return this.get(key)
  }
}

export {Filesystem as default}
