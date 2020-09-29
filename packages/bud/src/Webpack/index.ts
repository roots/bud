import Bud from '@roots/bud-types'
import Container from '@roots/container'

import node from './node'
import output from './output'
import optimization from './optimization'
import performance from './performance'
import resolve from './resolve'

import Plugins from './Plugins'
import pluginsRepository from './Plugins/repository'

class Webpack {
  public bud: Bud

  public config: Container

  public plugins: Plugins

  public constructor(bud: Bud) {
    this.config = bud.makeContainer({
      name: '@roots/bud',
      bail: true,
      cache: true,
      devtool: 'source-map',
      mode: 'none',
      entry: {},
      target: 'web',
      watch: false,
      node,
      output,
      optimization,
      performance,
      resolve,
      stats: {
        all: true,
      },
    })

    this.plugins = new Plugins(bud, pluginsRepository)
  }

  public make() {
    return {
      ...this.config,
      ...this.plugins.make()
    }
  }
}

export {Webpack as default}
