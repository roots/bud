import './interface'

import {Item, Loader, Rule} from '@roots/bud-build'
import type {Framework, Module} from '@roots/bud-framework'
import type * as Webpack from 'webpack'

import {MdxConfig} from './MdxConfig'

const extension: Module = {
  name: '@roots/bud-mdx',

  boot: (app: Framework) => {
    const {build, store, hooks} = app

    app.extensions.bindClass({
      mdx: [MdxConfig, app],
    })

    store.set('patterns.mdx', /\.mdx$/)

    build.loaders.mdx = new Loader(
      require.resolve('@mdx-js/loader'),
    )

    build.items.mdx = new Item({
      loader: ({build}) => build.loaders.mdx,
      options: ({mdx}) => mdx.options,
    })

    build.rules.mdx = new Rule({
      test: ({store}) => store.get('patterns.mdx'),
      exclude: ({store}) => store.get('patterns.modules'),
      use: ({build}) => [build.items.babel, build.items.mdx],
    })

    hooks.on(
      'build/resolve/extensions',
      (exts: Webpack.Configuration['resolve']['extensions']) => [
        ...exts,
        '.mdx',
      ],
    )
  },
}

export {extension as default, extension}

export const {name, boot} = extension
