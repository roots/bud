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
  app.store.is('features.hash', true)
    ? app.store.get('hashFormat').concat(ext ?? '.js')
    : app.store.get('fileFormat').concat(ext ?? '.js')
