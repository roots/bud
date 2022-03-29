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
const findReplace = (input: string): [string, string] => {
  const url = new URL(input)
  if (!url.pathname.endsWith('/')) url.pathname = `${url.pathname}/`
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
export const boot = async (app: Framework) => {
  /* Exit early if env is not set */
  if (!app.env.has('WP_SITEURL') || !app.env.has('WP_HOME')) return

  /**
   * Set proxy target to `WP_HOME`
   */
  app.proxy(new URL(app.env.get<string>('WP_HOME')).href)

  /**
   * Hook proxy server `WP_HOME` and `WP_SITEURL` replacements
   */
  app.hooks.action('event.proxy.interceptor', async ({hooks}) =>
    hooks.on('middleware.proxy.replacements', replacements => [
      ...(replacements ?? []),
      findReplace(app.env.get<string>('WP_HOME')),
      findReplace(app.env.get<string>('WP_SITEURL')),
    ]),
  )
}

export * as ThemeJSON from './theme'
