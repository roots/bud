import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  dependsOnOptional,
  label,
} from '@roots/bud-framework/extension/decorators'

/**
 * Sass support extension for `@roots/bud-sass`
 *
 * @public
 * @decorator `@label`
 * @decorator `@dependsOn`
 */
@label(`@roots/bud-sass`)
@dependsOn([`@roots/bud-sass/resolve-url`])
@dependsOnOptional([`@roots/bud-postcss`])
export default class BudSass extends Extension {
  /**
   * `afterConfig` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async afterConfig() {
    const implementation = await this.import(`sass`)

    this.app.build
      .setLoader(`sass`, await this.resolve(`sass-loader`))
      .setItem(`sass`, {
        loader: `sass`,
        options: {implementation, sourceMap: true},
      })
      .setRule(`sass`, {
        test: app => app.hooks.filter(`pattern.sass`),
        include: [app => app.path(`@src`)],
        use: [`precss`, `css`, `postcss`, `resolveUrl`, `sass`],
      })

    this.app.build.items.resolveUrl.setOptions((_app, options) => ({
      ...options,
      sourceMap: true,
    }))

    this.app.hooks.on(`build.resolve.extensions`, ext =>
      ext.add(`.scss`).add(`.sass`),
    )

    if (this.app.postcss) {
      this.app.postcss.syntax = `postcss-scss`
    }
  }
}
