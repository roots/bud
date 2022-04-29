import {Bud} from '@roots/bud-framework'

/**
 * Filename
 *
 * @param app - Bud
 * @param ext - Filename extension
 *
 * @returns filename format
 *
 * @public
 */
export const filenameFormat = (app: Bud, ext?: string) =>
  app.hooks.filter('feature.hash')
    ? app.hooks.filter('value.hashFormat').concat(ext ?? '.js')
    : app.hooks.filter('value.fileFormat').concat(ext ?? '.js')
