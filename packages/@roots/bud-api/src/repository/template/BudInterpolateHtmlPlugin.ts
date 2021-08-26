import type {
  Framework,
  Module,
  WebpackPlugin,
} from '@roots/bud-framework'

import {HtmlWebpackPlugin} from './BudHtmlWebpackPlugin'
import {InterpolateHtmlPlugin} from './InterpolateHtmlPlugin'

/**
 * Interpolate Html Webpack Plugin
 */
interface BudInterpolateHtmlWebpackPlugin
  extends WebpackPlugin<
    InterpolateHtmlPlugin,
    Framework.Index<RegExp>
  > {}

const BudInterpolateHtmlWebpackPlugin: BudInterpolateHtmlWebpackPlugin =
  {
    name: 'interpolate-html-plugin',

    options: app => {
      const env = Object.fromEntries(
        app.env
          .getEntries()
          .filter(([k]) => k.includes('APP_')) as Array<
          [string, RegExp]
        >,
      )

      const store =
        app.store.get(
          `extension.interpolate-html-plugin.replace`,
        ) ?? {}

      return {
        ...env,
        ...store,
      }
    },

    make: options =>
      new InterpolateHtmlPlugin(
        HtmlWebpackPlugin as any,
        options.all(),
      ),

    when: (_app: Framework, options: Module.Options) =>
      options.getEntries().length > 0,
  }

export const {name, options, make, when} =
  BudInterpolateHtmlWebpackPlugin
