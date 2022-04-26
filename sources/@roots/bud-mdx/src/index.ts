// Copyright © Roots Software Foundation LLC
// Licensed under the MIT license.

/**
 * Adds MDX support to Bud

 * @see https://bud.js.org
 * @see https://github.com/roots/bud
 *
 * @packageDocumentation
 */

import {Item, Loader} from '@roots/bud-build'
import {Extension} from '@roots/bud-framework'

import {MdxConfig} from './MdxConfig'

declare module '@roots/bud-framework' {
  interface Bud {
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
    '@roots/bud-mdx': Extension
  }

  namespace Store {
    interface Repository {
      'patterns.mdx': RegExp
    }
  }
}

const extension: Extension = {
  label: '@roots/bud-mdx',

  dependsOn: new Set(['@roots/bud-babel', '@roots/bud-react']),

  register: async (_options, app) => {
    app.mdx = new MdxConfig(app)
  },

  boot: async (_, app) =>
    app.hooks
      .on('build.resolve.extensions', ext => ext.add('.md').add('.mdx'))
      .build.setLoader(`mdx`, app.module.resolve(`@mdx-js/loader`))
      .setItem(`mdx`, {loader: `mdx`, options: ({mdx}) => mdx.options})
      .setRule(`mdx`, {
        test: /\.mdx?$/,
        include: app => [app.path('@src')],
        use: [`babel`, `mdx`],
      }),
}

export const {label, boot, register} = extension
