/**
 * Repo root path
 */
export declare const REPO_PATH: string

/**
 * Repo root manifest path
 */
export declare const ROOT_MANIFEST_PATH: string

/*
 * Storage root path
 */
export declare const STORAGE_PATH: string

/**
 * Enabled integration tests
 *
 * @remarks
 * This should be a part of jest config (once all integration tests are rewritten for verdaccio)
 */
export declare const INTEGRATION_TESTS: Array<string>

/**
 * Base public package tsconfig (CJS)
 */
export declare const TS_CONFIG_PATH: string

/**
 * Proxy registry URL
 */
export declare const REGISTRY_PROXY: string

/**
 * Repo paths
 */
export declare const paths: {
  root: string
  config: string
  sources: string
  storage: string
  tests: string
  fixtures: string
}

export declare const projectConfig: Record<string, any>
