// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Preset config for WordPress plugins & themes.
 *
 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import type {Extension, Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Modules {
    '@roots/bud-preset-wordpress': BudWordPressPreset
  }
}

/**
 * Preset config for WordPress plugins & themes
 * @public
 */
type BudWordPressPreset = Extension.Module

/**
 * Find/replace {@link URL.href} with {@link URL.pathname}
 *
 * @example
 * https://mysite.com `-->` [https://mysite.com/, /]
 * https://mysite.com/  `-->` [https://mysite.com/, /]
 * https://mysite.com/subsite `-->` [https://mysite.com/subsite/, /subsite/]
 */
const makeInterception = (input: string): [string, string] => {
  const url = new URL(input)

  url.pathname = url.pathname.endsWith('/')
    ? url.pathname
    : `${url.pathname}/`

  return [url.href, url.pathname]
}

/**
 * @public
 */
export const name: BudWordPressPreset['name'] =
  '@roots/bud-preset-wordpress'

/**
 * @public
 */
export const boot = async (app: Framework, logger: Console) => {
  /* Exit early if env is not set */
  if (!app.env.isString('WP_HOME')) return

  /* source env */
  const HOME: string = app.env.get('WP_HOME')
  logger.info(`WP_HOME envvar found`, HOME)

  /**
   * Set proxy target to `WP_HOME`
   */
  try {
    const url = new URL(HOME)
    app.proxy(url)
  } catch (err) {
    logger.warn(
      `\n`,
      `Tried to set proxy based on value of WP_HOME but failed\n`,
      `WP_HOME is set as: ${HOME}`,
      `\n`,
      err,
    )
  }

  /**
   * Set server based on `WP_HOME`
   */
  try {
    const url = new URL(HOME)
    app.serve({
      host: url.host,
      ssl: url.protocol === 'https:',
    })
  } catch (err) {
    logger.warn(
      `\n`,
      `Tried to set server based on value of WP_HOME but failed\n`,
      `WP_HOME is set as: ${HOME}`,
      `\n`,
      err,
    )
  }

  /**
   * Set interceptor replacements
   */
  app.hooks.action('event.proxy.interceptor', async ({hooks}) =>
    hooks.on('middleware.proxy.replacements', replacements => [
      ...(replacements ?? []),
      makeInterception(HOME),
    ]),
  )
}

export * as ThemeJSON from './theme'
