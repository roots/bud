import {Framework} from '@roots/bud-framework'
import {ForkTsCheckerWebpackPluginOptions as Options} from 'fork-ts-checker-webpack-plugin/lib/ForkTsCheckerWebpackPluginOptions'

interface OptionsFactory {
  (app: Framework): Options
}

/**
 * Configuration to use when bud.mode is `production`.
 */
export const PRODUCTION_OPTIONS: OptionsFactory = (app: Framework) => ({
  async: false,
  logger: {
    infrastructure: app.logger.instance,
    issues: app.logger.instance,
  },
  typescript: {
    useTypescriptIncrementalApi: true,
    memoryLimit: 4096,
    typescriptPath: require.resolve('typescript'),
    diagnosticOptions: {
      semantic: true,
      syntactic: true,
    },
  },
})

/**
 * options to use when bud.mode is `development`.
 */
export const DEVELOPMENT_OPTIONS = (app: Framework) => ({
  async: false,
  logger: {
    infrastructure: app.logger.instance,
    issues: app.logger.instance,
  },
  typescript: {
    useTypescriptIncrementalApi: true,
    typescriptPath: require.resolve('typescript'),
    diagnosticOptions: {
      semantic: true,
      syntactic: true,
    },
  },
})
