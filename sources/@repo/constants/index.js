import {join} from 'path'
import {fileURLToPath} from 'url'

export const root = (
  import.meta?.url && typeof import.meta.url !== `undefined`
    ? fileURLToPath(import.meta.url)
    : __dirname
)
  .split(`sources`)
  .shift()

export const path = (...path) => (path.length ? join(root, ...path) : root)
