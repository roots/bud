import {createRequire} from 'node:module'
import {join} from 'node:path'
import {fileURLToPath} from 'node:url'

/**
 * Repo root path
 */
// @ts-ignore
export const REPO_PATH = (
  import.meta?.url && typeof import.meta.url !== `undefined`
    ? fileURLToPath(import.meta.url)
    : __dirname
)
  .split(`sources/`)
  .shift()

/**
 * Repo root manifest path
 */
export const ROOT_MANIFEST_PATH = join(REPO_PATH, `package.json`)

/*
 * Storage root path
 */
export const STORAGE_PATH = join(REPO_PATH, `storage`)

/**
 * Base public package tsconfig (CJS)
 */
export const TS_CONFIG_PATH = join(REPO_PATH, `config`, `tsconfig.json`)

/**
 * Proxy registry URL
 */
export const REGISTRY_PROXY = `http://localhost:4873`

/**
 * Repo paths
 */
export const paths = {
  root: REPO_PATH,
  config: join(REPO_PATH, `config`),
  sources: join(REPO_PATH, `sources`),
  tests: join(REPO_PATH, `tests`),
  storage: join(REPO_PATH, `storage`),
  fixtures: join(REPO_PATH, `storage`, `fixtures`),
}

let projectConfig
if (typeof import.meta?.url !== `undefined`) {
  const require = createRequire(import.meta.url)
  projectConfig = require(`../../../config/monorepo.config.cjs`)
} else {
  projectConfig = require(`../../../config/monorepo.config.cjs`)
}

export {projectConfig}
