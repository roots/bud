import * as Framework from '@roots/bud-framework'

import * as themeJson from './api/themeJson'
import * as useTailwindColors from './api/useTailwindColors'
import {Options, ThemeJsonWebpackPlugin} from './plugin'

/**
 * Extension providing a way to manage WordPress `theme.json` values
 * from within the context of the build.
 *
 * @public
 */
export interface Extension
  extends Framework.Extension.CompilerPlugin<
    ThemeJsonWebpackPlugin,
    Options
  > {
  name: 'wp-theme-json'
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
export const name: Extension['name'] = 'wp-theme-json'

/**
 * Extension options
 *
 * @public
 */
export const options: Extension['options'] = {
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
}

/**
 * Extension api
 *
 * @public
 */
export const api: Extension['api'] = {
  themeJson: themeJson.method,
  useTailwindColors: useTailwindColors.method,
}

/**
 * Extension make
 *
 * @public
 */
export const make: Extension['make'] = (options, app) =>
  new ThemeJsonWebpackPlugin({
    path: app.path('project', 'theme.json'),
    json: app.json.stringify(
      {
        $schema: 'https://schemas.wp.org/trunk/theme.json',
        version: 2,
        settings: options.all(),
      },
      null,
      2,
    ),
  })

export const when: Extension['when'] = false
