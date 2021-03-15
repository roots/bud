import {Framework} from '@roots/bud-framework'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

export const typecheck: Framework.Typescript.TypeCheck = function (
  enabled = true,
) {
  enabled &&
    this.extensions.add('fork-ts-checker', {
      name: 'fork-ts-checker-plugin',
      options: ({isProduction}: Framework) =>
        isProduction
          ? {
              async: false,
              useTypescriptIncrementalApi: true,
              memoryLimit: 4096,
              diagnosticOptions: {
                semantic: true,
                syntactic: true,
              },
            }
          : {
              diagnosticOptions: {
                semantic: true,
                syntactic: true,
              },
            },
      make: () => new ForkTsCheckerWebpackPlugin(),
    })

  return this
}
