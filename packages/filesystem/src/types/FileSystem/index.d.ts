import _ from 'lodash'
import {FileContainer} from '../FileContainer'
import {Container, Indexed} from '@roots/container'

export {FileSystem}

declare class FileSystem extends Indexed {
  current: FileContainer

  repository: Container.Repository

  baseDir: string

  get: Container['get']

  ls: (key?: string) => Container['repository']

  set: (
    key: string,
    options: {
      baseDir: string
      glob: string[]
    },
  ) => FileContainer
}
