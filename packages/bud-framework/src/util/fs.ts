import filesystem from 'fs-extra'
import path from 'path'
import {URL} from 'url'

import type {PlatformPath} from 'path'

type PathLike = string | Buffer | URL
type Exists = (path: PathLike) => boolean
type FS = {
  path: PlatformPath
  fs: typeof filesystem
  existsSync: Exists
}

const fs: FS = {
  path,
  fs: filesystem,
  existsSync: filesystem.existsSync,
}

export {fs}
export type {FS}
