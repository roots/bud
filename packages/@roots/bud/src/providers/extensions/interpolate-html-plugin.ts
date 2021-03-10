import HtmlWebpackPlugin from 'html-webpack-plugin'
import {InterpolateHtmlPlugin} from '@roots/bud-support'
import {Framework, Module} from '@roots/bud-typings'

export const name = 'interpolate-html-plugin'

export const options: Module.Options<{
  [key: string]: RegExp
}> = (app: Framework) => ({
  ...Object.fromEntries(
    app.env
      .getEntries()
      .filter(([k]) => k.includes('APP_')) as Array<
      [string, RegExp]
    >,
  ),
  ...app.store.get('options.html.replacements'),
})

export const make: Module.Make<
  InterpolateHtmlPlugin,
  Framework.Container<
    Framework.Module.Options<{
      [key: string]: RegExp
    }>
  >
> = options =>
  new InterpolateHtmlPlugin(HtmlWebpackPlugin, options.all())

export const when: Module.When = (
  {store}: Framework,
  options: Module.Options,
) =>
  store.isTrue('options.html.enabled') &&
  options.getEntries().length > 0
