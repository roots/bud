import * as Framework from '@roots/bud-framework'

import * as themeJson from './api/themeJson'
import * as useTailwindColors from './api/useTailwindColors'
import {Options, ThemeJsonWebpackPlugin} from './plugin'

/**
 * Extension for managing WordPress `theme.json`
 *
 * @public
 */
export interface ThemeExtension
  extends Framework.Extension.CompilerPlugin<
    ThemeJsonWebpackPlugin,
    Options
  > {
  name: 'wp-theme-json'
  options: (app: Framework.Framework) => Options
  api: {
    themeJson: themeJson.method
    useTailwindColors: useTailwindColors.method
  }
}

/**
 * Extension name
 *
 * @public
 */
export const name: ThemeExtension['name'] = 'wp-theme-json'

/**
 * Extension options
 *
 * @public
 */
export const options: ThemeExtension['options'] = app => ({
  path: app.path('theme.json'),
  settings: {
    color: {
      custom: false,
      customGradient: false,
    },
    custom: {
      spacing: {},
      typography: {'font-size': {}, 'line-height': {}},
    },
    spacing: {
      padding: true,
      units: ['px', '%', 'em', 'rem', 'vw', 'vh'],
    },
    typography: {
      customFontSize: false,
      dropCap: false,
    },
  },
})

/**
 * Extension api
 *
 * @public
 */
export const api: ThemeExtension['api'] = {
  themeJson: themeJson.method,
  useTailwindColors: useTailwindColors.method,
}

/**
 * Extension make
 *
 * @public
 */
export const make: ThemeExtension['make'] = options =>
  new ThemeJsonWebpackPlugin({
    path: options.get('path'),
    settings: options.get('settings'),
  })

/**
 * Extension when
 *
 * @public
 */
export const when: ThemeExtension['when'] = false
