import {
  Framework,
  Module,
  Typescript,
} from '@roots/bud-framework'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

const PRODUCTION_CONFIG = {
  async: false,
  useTypescriptIncrementalApi: true,
  memoryLimit: 4096,
  diagnosticOptions: {
    semantic: true,
    syntactic: true,
  },
}

const DEVELOPMENT_CONFIG = {
  diagnosticOptions: {
    semantic: true,
    syntactic: true,
  },
}

export const typecheck: Typescript.TypeCheck = function (
  enabled = true,
) {
  !enabled &&
    this.extensions.has('fork-ts-checker-plugin') &&
    this.extensions.remove('fork-ts-checker-plugin')

  const extension: Module = {
    name: 'fork-ts-checker-plugin',
    options: ({isProduction}: Framework) => {
      return isProduction
        ? PRODUCTION_CONFIG
        : DEVELOPMENT_CONFIG
    },
    make: () => new ForkTsCheckerWebpackPlugin(),
  }

  this.extensions.add(extension)

  return this
}
