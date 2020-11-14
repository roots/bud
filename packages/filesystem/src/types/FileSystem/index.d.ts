import _ from 'lodash'
import {FileContainer} from '../FileContainer'

export {FileSystem}

declare class FileSystem {
  current: FileContainer

  repository: {[key: string]: FileContainer}

  baseDir: string

  ls: (key?: string) => FileSystem['repository']

  set: (
    key: string,
    options: {
      baseDir: string
      glob: string[]
    },
  ) => FileSystem['current']
}
