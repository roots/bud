// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * ESBuild support for Bud projects
 *
 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @beta @packageDocumentation
 */

import './interface'

import {Extension} from '@roots/bud-framework'
import {
  bind,
  label,
  options,
} from '@roots/bud-framework/extension/decorators'
import {ESBuildMinifyPlugin} from 'esbuild-loader'

type Opts = {
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

@options<Opts>({
  minify: app => ({
    css: true,
    include: [
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
@label('@roots/bud-esbuild')
class BudEsbuild extends Extension<Opts> {
  @bind
  public async boot() {
    this.app.build
      .setLoader('esbuild', require.resolve('esbuild-loader'))
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
        include: ({path}) => [path('@src')],
        use: ['esbuild-ts'],
      })
      .rules.js.setUse(['esbuild-js'])

    this.app.hooks.on('build.resolve.extensions', ext =>
      ext.add('.ts').add('.tsx'),
    )

    this.app.hooks.action('event.build.before', async ({hooks}) => {
      hooks.on('build.optimization.minimizer', () => [
        new ESBuildMinifyPlugin(this.options.minify),
      ])
    })
  }
}

export default BudEsbuild
