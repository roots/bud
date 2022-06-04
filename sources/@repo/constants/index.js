import {createRequire} from 'module'
import {join} from 'path'

/**
 * Repo root path
 *
 * @public
 */
// @ts-ignore
export const REPO_PATH = (
  import.meta?.url && typeof import.meta.url !== 'undefined'
    ? import.meta.url.replace('file:/', '')
    : __dirname
)
  .split('sources/')
  .shift()

/**
 * Repo root manifest path
 *
 * @public
 */
export const ROOT_MANIFEST_PATH = join(REPO_PATH, 'package.json')

/*
 * Storage root path
 *
 * @public
 */
export const STORAGE_PATH = join(REPO_PATH, 'storage')

/**
 * Enabled integration tests
 *
 * @remarks
 * This should be a part of jest config (once all integration tests are rewritten for verdaccio)
 *
 * @public
 */
export const INTEGRATION_TESTS = [
  'basic',
  'postcss',
  'sass',
  'tailwindcss',
  'sass-tailwindcss',
  'babel',
  'vue',
  'vue-legacy',
  'react',
  'typescript',
  'imagemin',
  'sage',
  'multi-compiler',
]

/**
 * Base public package tsconfig (CJS)
 *
 * @public
 */
export const TS_CONFIG_PATH = join(REPO_PATH, 'config', 'tsconfig.json')

/**
 * Proxy registry URL
 *
 * @public
 */
export const REGISTRY_PROXY = 'http://verdaccio:4873'

/**
 * Repo paths
 */
export const paths = {
  root: REPO_PATH,
  config: join(REPO_PATH, 'config'),
  sources: join(REPO_PATH, 'sources'),
  tests: join(REPO_PATH, 'tests'),
  mocks: join(REPO_PATH, '../mocks'),
}

let projectConfig
if (typeof import.meta?.url !== 'undefined') {
  const require = createRequire(import.meta.url)
  projectConfig = require('../../../config/monorepo.config.cjs')
} else {
  projectConfig = require('../../../config/monorepo.config.cjs')
}

export {projectConfig}
