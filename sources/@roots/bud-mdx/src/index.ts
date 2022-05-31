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
import {Extension} from '@roots/bud-framework/extension'
import {bind} from '@roots/bud-framework/extension/decorators'

import {MdxConfig} from './MdxConfig/index.js'

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

export default class extension extends Extension {
  public label = '@roots/bud-mdx'

  public dependsOn = new Set(['@roots/bud-babel', '@roots/bud-react'])

  @bind
  public async register() {
    this.app.mdx = new MdxConfig(this.app)
  }

  public async boot() {
    this.app.hooks.on('build.resolve.extensions', ext =>
      ext.add('.md').add('.mdx'),
    )

    const loader = await this.resolve('@mdx-js/loader')
    this.app.build
      .setLoader(`mdx`, loader)
      .setItem(`mdx`, {loader: `mdx`, options: ({mdx}) => mdx.options})
      .setRule(`mdx`, {
        test: /\.mdx?$/,
        include: [app => app.path('@src')],
        use: [`babel`, `mdx`],
      })
  }
}
