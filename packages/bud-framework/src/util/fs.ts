import {existsSync} from 'fs-extra'
import path from 'path'
import {URL} from 'url'

import type {PlatformPath} from 'path'

type PathLike = string | Buffer | URL
type Exists = (path: PathLike) => boolean
type FS = {
  path: PlatformPath
  existsSync: Exists
}

const fs: FS = {
  path,
  existsSync,
}

export {fs}
export type {FS}
