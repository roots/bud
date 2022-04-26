import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  label,
} from '@roots/bud-framework/extension/decorators'

@label('@roots/bud-sass')
@dependsOn(['@roots/bud-postcss'])
export default class BudSass extends Extension {
  @bind
  public async implementation() {
    try {
      const sass = await this.import('sass')

      this.logger.success('sass imported')

      return sass
    } catch (e) {
      this.logger.error(e)
      throw new Error(
        'sass not found. Install it with `yarn add sass --dev` or `npm i sass --save-dev`. This may be a problem with bud; please let us know what you experienced by filing an issue at https://github.com/roots/bud',
      )
    }
  }

  @bind
  public async register() {
    const implementation = await this.implementation()

    this.app.hooks.on('build.resolve.extensions', ext =>
      ext.add('.scss').add('.sass'),
    )

    this.app.build
      .setLoader('sass', this.resolve('sass-loader'))
      .setItem('sass', {
        loader: 'sass',
        options: {
          implementation,
          sourceMap: true,
        },
      })
      .setRule('sass', {
        test: app => app.hooks.filter('pattern.sass'),
        include: app => [app.path('@src')],
        use: [`precss`, `css`, `postcss`, `resolveUrl`, `sass`],
      })
  }

  @bind
  public async boot() {
    this.app.postcss.syntax = 'postcss-scss'
  }
}
