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

import {Modules} from '@roots/bud-framework'
import {ESBuildMinifyPlugin} from 'esbuild-loader'

/** @public */
export type extension = Modules['@roots/bud-esbuild']

/** @public */
export const label: extension['label'] = '@roots/bud-esbuild'

/** @public */
export const options: extension['options'] = ({project, hooks}) => ({
  minify: {
    css: true,
    include: [hooks.filter('pattern.js'), hooks.filter('pattern.ts')],
    exclude: hooks.filter('pattern.modules'),
  },
  js: {
    loader: 'jsx',
    target: 'es2015',
  },
  ts: {
    loader: 'tsx',
    target: 'es2015',
    tsconfigRaw:
      project.get(['config', 'base', 'tsconfig.json', 'module']) ?? null,
  },
})

/** @public */
export const boot: extension['boot'] = async ({
  build,
  extensions,
  hooks,
}) => {
  build
    .setLoader('esbuild', require.resolve('esbuild-loader'))
    .setItem('esbuild-js', {
      loader: 'esbuild',
      options: ({extensions}) =>
        extensions.get('@roots/bud-esbuild').options.get('js'),
    })
    .setItem('esbuild-ts', {
      loader: 'esbuild',
      options: ({extensions}) =>
        extensions.get('@roots/bud-esbuild').options.get('ts'),
    })
    .setRule('ts', {
      test: ({hooks}) => hooks.filter('pattern.ts'),
      include: ({path}) => [path('@src')],
      use: ['esbuild-ts'],
    })
    .rules.js.setUse(['esbuild-js'])

  hooks.on('build.resolve.extensions', ext => ext.add('.ts').add('.tsx'))

  hooks.action('event.build.before', async ({hooks}) => {
    hooks.on('build.optimization.minimizer', () => [
      new ESBuildMinifyPlugin(
        extensions.get('@roots/bud-esbuild').options.get('minify'),
      ),
    ])
  })
}
