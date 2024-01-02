import {createRequire} from 'module'
import {join} from 'path'
import {fileURLToPath} from 'url'

export const root = (
  import.meta?.url && typeof import.meta.url !== `undefined`
    ? fileURLToPath(import.meta.url)
    : __dirname
)
  .split(`sources/`)
  .shift()

export const path = (...path) => path.length ? join(root, ...path) : root

export const ROOT_MANIFEST_PATH = path(`package.json`)
export const STORAGE_PATH = path(`storage`)
export const TS_CONFIG_PATH = path(`config`, `tsconfig.json`)
export const REGISTRY_PROXY = `http://localhost:4873`

export const paths = {
  config: path(`config`),
  fixtures: path(`storage`, `fixtures`),
  root: root,
  sources: path(`sources`),
  storage: path(`storage`),
  tests: path(`tests`),
}

let projectConfig
if (typeof import.meta?.url !== `undefined`) {
  const require = createRequire(import.meta.url)
  projectConfig = require(`../../../config/monorepo.config.cjs`)
} else {
  projectConfig = require(`../../../config/monorepo.config.cjs`)
}

export {projectConfig}
