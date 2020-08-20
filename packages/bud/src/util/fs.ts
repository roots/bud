import {existsSync} from 'fs-extra'
import path from 'path'

type FS = {
  path
  existsSync
}

const fs: FS = {
  path,
  existsSync,
}

export {fs}
export type {FS}
