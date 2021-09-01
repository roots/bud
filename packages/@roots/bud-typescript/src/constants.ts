/**
 * Configuration to use when bud.mode is `production`.
 */
export const PRODUCTION_CONFIG = {
  async: false,
  useTypescriptIncrementalApi: true,
  memoryLimit: 4096,
  diagnosticOptions: {
    semantic: true,
    syntactic: true,
  },
}

/**
 * Configuration to use when bud.mode is `development`.
 */
export const DEVELOPMENT_CONFIG = {
  diagnosticOptions: {
    semantic: true,
    syntactic: true,
  },
}
