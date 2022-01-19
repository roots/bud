export const ROOTS_PATH = '/roots'

export const EXAMPLES_DIR = `${ROOTS_PATH}/examples`

export const TS_CONFIG_PATH = './config/tsconfig.json'

export const REGISTRY_NPM = 'https://registry.npmjs.org/'

export const REGISTRY_PROXY = 'http://verdaccio:4873'

/**
 * Enabled integration tests
 *
 * @internalRemarks
 * This should be a part of jest config (once all integration tests are rewritten for verdaccio)
 *
 * @internal
 */
export const INTEGRATION_TESTS = ['babel', 'sage']
