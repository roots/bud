
/**
 * Repo root path
 * 
 * @public
 */
export const REPO_ROOT = `${__dirname}/../../..`

/**
 * Enabled integration tests
 *
 * @remarks
 * This should be a part of jest config (once all integration tests are rewritten for verdaccio)
 *
 * @internal
 */
export const INTEGRATION_TESTS = ['babel', 'sage']

/**
 * Base public package tsconfig
 * 
 * @public
 */
export const TS_CONFIG_PATH = `${REPO_ROOT}/config/tsconfig.json`


export const REGISTRY_PROXY = 'http://verdaccio:4873'

export const containerPaths = {
  mocks: `/srv/mocks`,
}

export const repoPaths = {
  root: REPO_ROOT,
}

export {manifest} from '../../../package.json'
