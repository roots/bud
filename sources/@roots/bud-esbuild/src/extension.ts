import {Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {ESBuildMinifyPlugin} from 'esbuild-loader'

export interface Options {
  minify: {
    css: boolean
    include: string | RegExp | Array<string | RegExp>
    exclude: string | RegExp | Array<string | RegExp>
  }
  js: {
    loader: 'jsx' | 'jsx'
    target: string
  }
  ts: {
    loader: 'tsx' | 'ts'
    target: string
    tsconfigRaw: Record<string, any>
  }
}

/**
 * Bud esbuild extension
 *
 * @public
 * @decorator `@label`
 * @decorator `@options`
 */
@label('@roots/bud-esbuild')
@options<Options>({
  minify: app => ({
    css: true,
    include: [
      app.hooks.filter('pattern.css'),
      app.hooks.filter('pattern.js'),
      app.hooks.filter('pattern.ts'),
    ],
    exclude: app.hooks.filter('pattern.modules'),
  }),
  js: () => ({
    loader: 'jsx',
    target: 'es2015',
  }),
  ts: ({project}) => ({
    loader: 'tsx',
    target: 'es2015',
    tsconfigRaw:
      project.get(['config', 'base', 'tsconfig.json', 'module']) ?? null,
  }),
})
export default class BudEsbuild extends Extension<Options> {
  /**
   * `boot` callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async boot() {
    const loader = await this.resolve('esbuild-loader')

    this.app.build
      .setLoader('esbuild', loader)
      .setItem('esbuild-js', {
        loader: 'esbuild',
        options: () => this.options.js,
      })
      .setItem('esbuild-ts', {
        loader: 'esbuild',
        options: () => this.options.ts,
      })
      .setRule('ts', {
        test: ({hooks}) => hooks.filter('pattern.ts'),
        include: [({path}) => path('@src')],
        use: ['esbuild-ts'],
      })
      .rules.js.setUse(['esbuild-js'])

    this.app.hooks.on('build.resolve.extensions', ext =>
      ext.add('.ts').add('.tsx'),
    )
  }

  /**
   * `beforeBuild` callback
   *
   * @public
   */
  @bind
  public async beforeBuild() {
    this.app.hooks.on('build.optimization.minimizer', () => [
      new ESBuildMinifyPlugin(this.options.minify),
    ])
  }
}
