import filesystem from 'fs-jetpack'

export const append = filesystem.appendAsync
export const copy = filesystem.copyAsync
export const createReadStream = filesystem.createReadStream
export const createWriteStream = filesystem.createWriteStream
export const cwd = filesystem.cwd
export const dir = filesystem.dirAsync
export const exists = filesystem.existsAsync
export const find = filesystem.findAsync
export const inspect = filesystem.inspectAsync
export const inspectTree = filesystem.inspectTreeAsync
export const list = filesystem.listAsync
export const move = filesystem.moveAsync
export const path = filesystem.path
export const read = filesystem.readAsync
export const remove = filesystem.removeAsync
export const rename = filesystem.renameAsync
export const symlink = filesystem.symlinkAsync
export const tmpDir = filesystem.tmpDirAsync
export const write = filesystem.writeAsync

export interface FS {
  append: typeof append
  copy: typeof copy
  createReadStream: typeof createReadStream
  createWriteStream: typeof createWriteStream
  cwd: typeof cwd
  dir: typeof dir
  exists: typeof exists
  find: typeof find
  inspect: typeof inspect
  inspectTree: typeof inspectTree
  list: typeof list
  move: typeof move
  path: typeof path
  read: typeof read
  remove: typeof remove
  rename: typeof rename
  symlink: typeof symlink
  tmpDir: typeof tmpDir
  write: typeof write
}
