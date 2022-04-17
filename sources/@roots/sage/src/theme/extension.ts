import {Module} from '@roots/bud-framework'

import * as themeJson from './api/themeJson'
import * as useTailwindColors from './api/useTailwindColors'
import {Options, ThemeJsonWebpackPlugin} from './plugin'

/**
 * Extension for managing WordPress `theme.json`
 *
 * @public
 */
export type Extension = Module<Options, ThemeJsonWebpackPlugin>

/** @public */
export const label: Extension['label'] = 'wp-theme-json'

/** @public */
export const options: Extension['options'] = app => ({
  path: app.path('./theme.json'),
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

/** @public */
export const register: Extension['register'] = async ({api}) => {
  api.bindFacade('themeJson', themeJson.method)
  api.bindFacade('useTailwindColors', useTailwindColors.method)
}

/** @public */
export const make: Extension['make'] = options =>
  new ThemeJsonWebpackPlugin({
    path: options.get('path'),
    settings: options.get('settings'),
  })

/** @public */
export const when: Extension['when'] = false
