import {devServer} from './devServer'
import {entry} from './entry'
import {externals} from './externals'
import {general} from './general'
import {rules} from './rules/index'
import {optimization} from './optimization'
import {output} from './output'
import {webpackResolve} from './webpackResolve'
import {plugins} from './plugins/index'

/**
 * Make Webpack Config
 *
 * @param  {import('./../index')} bud
 * @return {object}
 */
const webpackConfig = bud => ({
  bud,

  options: {
    entry: entry(bud),
    output: output(bud),
    rules: rules(bud),
    optimization: optimization(bud),
    plugins: plugins(bud),
    resolve: webpackResolve(bud),
    externals: externals(bud),
    devServer: devServer(bud),
    general: general(bud),
  },

  mergeConfig: function (configValues) {
    this.config = {
      ...this.config,
      ...configValues,
    }
  },

  compile: function () {
    this.doHook('pre', this.options)

    this.mergeConfig(this.options.entry.make())
    this.mergeConfig(this.options.output.make())
    this.mergeConfig(this.options.rules.make())
    this.mergeConfig(this.options.optimization.make())
    this.mergeConfig(this.options.plugins.make())
    this.mergeConfig(this.options.resolve.make())
    this.mergeConfig(this.options.externals.make())
    this.mergeConfig(this.options.devServer.make())
    this.mergeConfig(this.options.general.make())

    this.doHook('post', this.config)

    return this.config
  },

  doHook: function (name, ...params) {
    this.bud.hooks.call(`${name}_webpack`, this, params)
  },
})

export {webpackConfig}
