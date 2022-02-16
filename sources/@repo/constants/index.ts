import {join} from 'path'

/**
 * Repo root path
 *
 * @public
 */
export const REPO_PATH = __dirname.split('/sources/').shift()

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
export const INTEGRATION_TESTS = ['babel', 'sage']

/**
 * Base public package tsconfig
 *
 * @public
 */
export const TS_CONFIG_PATH = `${REPO_PATH}/config/tsconfig.json`

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
  config: `${REPO_PATH}/config`,
  sources: `${REPO_PATH}/sources`,
  tests: `${REPO_PATH}/tests`,
  mocks: `${REPO_PATH}/../mocks`,
}

/**
 * manifest
 *
 * @public
 */
export {config as projectConfig} from '../../../config/monorepo.config'
