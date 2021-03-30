import {Framework} from '@roots/bud-framework'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

export const typecheck: Framework.Typescript.TypeCheck = function (
  this: Framework,
  enabled = true,
) {
  if (
    !enabled &&
    this.extensions.has('fork-ts-checker-plugin')
  ) {
    this.extensions.remove('fork-ts-checker-plugin')
  }

  const extension: Framework['module'] = {
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
  }

  this.extensions.add(extension)

  return this
}
