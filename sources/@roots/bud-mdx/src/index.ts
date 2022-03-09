// Copyright (c) Roots Foundation, LLC. All rights reserved.
// Licensed under the MIT license.

/**
 * Adds MDX support to Bud

 * @see https://roots.io/bud
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {Item, Loader} from '@roots/bud-build'
import {Extension, Framework} from '@roots/bud-framework'

import {MdxConfig} from './MdxConfig'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * Configure mdx to suit your application needs
     */
    mdx: MdxConfig
  }

  interface Loaders {
    mdx: Loader
  }

  interface Items {
    mdx: Item
  }

  /**
   * {@inheritDoc @roots/bud-framework#Modules}
   * @public @override
   */
  interface Modules {
    '@roots/bud-mdx': Extension.Module
  }

  namespace Store {
    interface Repository {
      'patterns.mdx': RegExp
    }
  }
}

const extension: Extension.Module = {
  name: '@roots/bud-mdx',

  mixin: async app => ({
    mdx: [MdxConfig, app],
  }),

  boot: (app: Framework) => {
    const {build, store, hooks} = app

    store.set('patterns.mdx', /\.mdx?$/)

    build
      .setLoader('mdx', require.resolve('@mdx-js/loader'))
      .setItem('mdx', {
        loader: ({build}) => build.loaders.mdx,
        options: ({mdx}) => mdx.options,
      })
      .setRule('mdx', {
        test: ({store}) => store.get('patterns.mdx'),
        exclude: ({store}) => store.get('patterns.modules'),
        use: [`babel`, `mdx`],
      })

    hooks.on('build.resolve.extensions', ext => ext.add('.md').add('.mdx'))
  },
}

export const {name, boot, mixin} = extension
