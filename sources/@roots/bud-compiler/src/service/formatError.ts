import type {
  StatsCompilation,
  StatsError,
  StatsModule,
} from '@roots/bud-framework/config'
import type {
  ErrorWithSourceFile,
  SourceFile,
} from '@roots/bud-support/open'

import isNull from '@roots/bud-support/isNull'
import isString from '@roots/bud-support/isString'
import logger from '@roots/bud-support/logger'

export const makeErrorFormatter =
  (stats: StatsCompilation) =>
  (error: StatsError): ErrorWithSourceFile | StatsError => {
    try {
      let file: SourceFile[`file`] | undefined
      let module: StatsModule | undefined

      const ident = error.moduleId ?? error.moduleName

      /**
       * In a perfect world webpack plugins would use the
       * {@link StatsError.nameForCondition} property to identify the module.
       */
      if (ident && stats?.children) {
        module = stats.children
          .flatMap(child => child?.modules)
          .find(module => [module?.id, module?.name].includes(ident))
      }

      /**
       * If the module is not found, we try to parse the error message
       */
      if (!ident && error.message?.includes(`[stylelint]`)) {
        // try to get the origin of the stylelint error,
        // which is contained in the second line of the error message
        const unparsedOrigin = error.message?.split(`\n`)?.[1]

        // if the origin is not a string or too long, we return the error as-is
        if (!isString(unparsedOrigin) || unparsedOrigin.length > 100)
          return error

        // extract absolute path and context relative name of module
        const styleError = unparsedOrigin.match(
          /file:\/\/(.*)\x07(.*)\x1B]8;;/,
        )
        if (isNull(styleError)) return error

        // get parts of matched error
        const [, file, name] = styleError
        // return enriched error
        return {...error, file, name, nameForCondition: file}
      }

      /**
       * If the module is still not found, we return the error as-is
       */
      if (!module) return error

      /**
       * We'll prefer the `nameForCondition` property if it exists,
       * otherwise we'll use the `name` property.
       */
      file = module.nameForCondition ?? module.name

      const name = module.name ?? error.name ?? `error`
      return {...error, file, name}
    } catch (formatError) {
      logger.warn(
        `Problem parsing errors. This probably won't break anything but please report it: https://github.com/roots/bud/issues/new`,
        formatError,
      )
      return error
    }
  }
