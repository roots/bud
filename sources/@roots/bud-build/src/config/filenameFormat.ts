import type {Bud} from '@roots/bud-framework'

/**
 * Filename
 *
 * @param app - Bud
 * @param extension - Filename extension
 *
 * @returns filename format
 *
 * @public
 */
export const filenameFormat = (app: Bud, extension?: string): string => {
  if (!extension) {
    extension = app.hooks.filter('build.experiments.outputModule')
      ? '.mjs'
      : '.js'
  }

  return app.hooks.filter('feature.hash')
    ? app.hooks.filter('value.hashFormat').concat(extension)
    : app.hooks.filter('value.fileFormat').concat(extension)
}
