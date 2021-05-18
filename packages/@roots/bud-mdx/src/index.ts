import './interface'

import {Framework, Module} from '@roots/bud-framework'
import {Loader, Item, Rule} from '@roots/bud-build'
import {MdxConfig} from './api'

const extension: Module = {
  name: '@roots/bud-mdx',
  boot: (app: Framework) => {
    Object.assign(app, {
      mdx: new MdxConfig(app),
    })

    app.store.set('patterns.mdx', /\.mdx$/)

    app.build.loaders.mdx = new Loader(app =>
      require.resolve('@mdx-js/loader'),
    )

    app.build.items.mdx = new Item({
      loader: ({build}) => build.loader.get('mdx'),
      options: ({mdx}) => mdx.options,
    })

    app.build.rules.mdx = new Rule({
      test: ({store}) => store.get('patterns.mdx'),
      exclude: ({store}) => store.get('patterns.modules'),
      use: ({build}) => [build.items.babel, build.items.mdx],
    })

    /**
     * .mdx extension
     */
    app.hooks.on(
      'build/resolve/extensions',
      (exts: `.${string}`[]) => [...exts, '.mdx'],
    )
  },
}

export default extension
export const {name, boot} = extension
