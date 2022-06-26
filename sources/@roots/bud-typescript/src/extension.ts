import {Extension} from '@roots/bud-framework/extension'
import {
  bind,
  dependsOn,
  expose,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {isUndefined} from 'lodash-es'

/**
 * BudTypeScript configures the TypeScript compiler
 *
 * @public
 * @decorator `@label`
 * @decorator `@expose`
 * @decorator `@options`
 * @decorator `@dependsOn`
 */
@label('@roots/bud-typescript')
@expose('typescript')
@options({
  babel: true,
  reactFastRefresh: true,
  loader: {
    transpileOnly: true,
  },
})
@dependsOn(['@roots/bud-babel', '@roots/bud-typescript/typecheck'])
export default class BudTypeScript extends Extension {
  /**
   * Typechecking controls
   *
   * @public
   * @decorator `@bind`
   */
  public get typecheck() {
    return this.app.extensions.get('@roots/bud-typescript/typecheck')
  }

  /**
   * Disable or enable babel transforms
   *
   * @public
   * @decorator `@bind`
   */
  @bind public useBabel(enable?: boolean): this {
    if (isUndefined(enable)) this.setOption('babel', true)
    this.setOption('babel', enable)
    return this
  }

  /**
   * Disable or enable react fast refresh in isDevelopment
   *
   * @public
   * @decorator `@bind`
   */
  @bind public reactFastRefresh(enable?: boolean): this {
    if (isUndefined(enable)) this.setOption('reactFastRefresh', true)
    this.setOption('reactFastRefresh', enable)
    return this
  }

  /**
   * `register` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind public async register() {
    this.setOption('context', this.app.path('./'))
    this.app.hooks.on('build.resolve.extensions', extensions =>
      extensions.add('.ts').add('.tsx'),
    )
  }

  /**
   * `beforeBuild` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind public async beforeBuild() {
    await this.reactConcerns()

    this.app.build
      .setLoader('ts', await this.resolve('ts-loader'))
      .setItem('ts', {
        loader: 'ts',
        options: () => this.options.loader,
      })
      .setRule('ts', {
        test: ({hooks}) => hooks.filter('pattern.ts'),
        include: [({path}) => path('@src')],
        use: [this.options.babel ? 'babel' : null, 'ts'].filter(Boolean),
      })

    this.app.build.rules.js.setUse(
      [this.options.babel ? 'babel' : null, 'ts'].filter(Boolean),
    )

    this.logger.log(this.app.build.items.ts.getOptions())
  }

  /**
   * JSX/TSX specific configuration
   *
   * @public
   * @decorator `@bind`
   */
  @bind public async reactConcerns() {
    if (
      this.options.reactFastRefresh === false || // opted out
      this.options.babel === true || // uses babel
      !this.app.extensions.has('@roots/bud-react') // not react
    )
      return

    /**
     * Lazy import in case this isn't needed
     */
    const ReactRefreshTypescript = await this.import(
      'react-refresh-typescript',
    )

    this.setOption('loader', options => ({
      ...(options ?? {}),
      getCustomTransformers: () => ({
        before: [
          this.app.isDevelopment && ReactRefreshTypescript(),
        ].filter(Boolean),
      }),
    }))

    this.logger.log('loader options:', this.options.loader)
  }
}
