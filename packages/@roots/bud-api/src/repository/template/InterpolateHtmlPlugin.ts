import {Framework, Module} from '@roots/bud-framework'
import {InterpolateHtmlPlugin} from '@roots/bud-support'

import {HtmlWebpackPlugin} from './HtmlWebpackPlugin'

const extension: Module<
  InterpolateHtmlPlugin,
  {[key: string]: RegExp}
> = {
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
      app.store.get('extension.interpolateHtmlPlugin.replace') ??
      {}

    return {
      ...env,
      ...store,
    }
  },

  make: options =>
    new InterpolateHtmlPlugin(HtmlWebpackPlugin, options.all()),

  when: (_app: Framework, options: Module.Options) =>
    options.getEntries().length > 0,
}

export const {name, options, make, when} = extension
