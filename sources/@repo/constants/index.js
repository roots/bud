import {createRequire} from 'node:module'
import {join} from 'node:path'
import {fileURLToPath} from 'node:url'

export const root = (
  import.meta?.url && typeof import.meta.url !== `undefined`
    ? fileURLToPath(import.meta.url)
    : __dirname
)
  .split(`sources/`)
  .shift()

export const path = (...path) => join(root, ...path)

export const ROOT_MANIFEST_PATH = path(`package.json`)
export const STORAGE_PATH = path(`storage`)
export const TS_CONFIG_PATH = path(`config`, `tsconfig.json`)
export const REGISTRY_PROXY = `http://localhost:4873`

export const paths = {
  root: root,
  config: path(`config`),
  sources: path(`sources`),
  tests: path(`tests`),
  storage: path(`storage`),
  fixtures: path(`storage`, `fixtures`),
}

let projectConfig
if (typeof import.meta?.url !== `undefined`) {
  const require = createRequire(import.meta.url)
  projectConfig = require(`../../../config/monorepo.config.cjs`)
} else {
  projectConfig = require(`../../../config/monorepo.config.cjs`)
}

export {projectConfig}
