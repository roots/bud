import {Framework, Typescript} from '@roots/bud-framework'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

export const typecheck: Typescript.TypeCheck = function (
  enabled = true,
) {
  !enabled &&
    this.extensions.has('fork-ts-checker-plugin') &&
    this.extensions.remove('fork-ts-checker-plugin')

  const extension: Framework['module'] = {
    /**
     * @property name
     */
    name: 'fork-ts-checker-plugin',

    /**
     * @property options
     */
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
