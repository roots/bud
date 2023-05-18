import type {Bud} from '@roots/bud-framework'
import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  dependsOnOptional,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'

/**
 * Sass configuration
 */
@label(`@roots/bud-sass`)
@dependsOn([`@roots/bud-sass/resolve-url`])
@dependsOnOptional([`@roots/bud-postcss`])
@options({
  implementation: null,
  sourceMap: true,
})
@expose(`sass`)
export class BudSass extends Extension {
  /**
   * {@link Extension.register}
   */
  @bind
  public override async register({build, hooks}: Bud) {
    /** Source loader */
    const loader = await this.resolve(`sass-loader`, import.meta.url)
    if (!loader) return this.logger.error(`sass-loader not found`)

    /** Source sass implementation */
    const implementation = await this.import(`sass`)
    if (!implementation) return this.logger.error(`sass not found`)

    /** Set options */
    this.setOptions({implementation, sourceMap: true})

    /** Set loader alias */
    hooks.on(`build.resolveLoader.alias`, (aliases = {}) => ({
      ...aliases,
      [`sass-loader`]: loader,
    }))

    /** Resolve .scss and .sass extensions */
    hooks.on(`build.resolve.extensions`, ext =>
      ext.add(`.scss`).add(`.sass`),
    )

    /** Setup rule */
    build
      .setLoader(`sass-loader`, loader)
      .setItem(`sass`, {
        ident: `sass`,
        loader: `sass-loader`,
        options: () => this.options,
      })
      .setRule(`sass`, {
        test: (app: Bud) => app.hooks.filter(`pattern.sass`),
        include: [app => app.path(`@src`)],
      })
  }

  /**
   * {@link Extension.boot}
   */
  @bind
  public override async boot(bud: Bud) {
    if (bud.postcss) {
      bud.postcss.set(`postcssOptions.syntax`, `postcss-scss`)
    }

    bud.build.rules.sass.setUse(() =>
      [
        bud.build.items[`precss`],
        bud.build.items[`css`],
        bud.build.items[`postcss`],
        bud.build.items[`resolve-url`],
        bud.build.items[`sass`],
      ].filter(Boolean),
    )
  }

  /**
   * Register global stylsheet
   *
   * @remarks
   * Used to register styles which are included globally
   *
   * @example
   * ```ts
   * bud.sass.registerGlobal(`$primary-color: #ff0000;`)
   * ```
   */
  @bind
  public registerGlobal(data: string | Array<string>): this {
    return this.set(`additionalData`, (value = ``) => {
      const code = (Array.isArray(data) ? data : [data])
        .map(str => str.trim())
        .filter(Boolean)
        .join(`\n`)

      return value.concat(code)
    })
  }

  /**
   * Import a partial globally
   *
   * @remarks
   * Used to import a partial globally (such as a `variables.scss` file)
   *
   * @example
   * With a single module signifier:
   * ```ts
   * bud.sass.importGlobal('styles/variables.scss')
   * ```
   *
   * @example
   * With an array of module signifiers:
   * ```ts
   * bud.sass.importGlobal([
   *  'styles/variables.scss',
   *  'styles/mixins.scss',
   * ])
   * ```
   */
  @bind
  public importGlobal(data: string | Array<string>): this {
    const globals = (Array.isArray(data) ? data : [data])
      .map(str => str.trim())
      .filter(Boolean)
      .map(item => `@import "${item}";`)

    return this.registerGlobal(globals)
  }
}
