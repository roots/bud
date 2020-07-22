import {devServer} from './devServer'
import {entry} from './entry'
import {externals} from './externals'
import {general} from './general'
import {rules} from './rules/index'
import {optimization} from './optimization'
import {output} from './output'
import {webpackResolve} from './webpackResolve'
import {plugins} from './plugins'

/**
 * Constructs WebpackBuilder object
 *
 * @constructor
 * @param {bud} bud
 * @return {WebpackBuilder}
 */
const webpackBuilder = (
  bud: Bud,
): WebpackBuilder => ({
  bud,

  /**
   * @property {WebpackBuilder.options} options
   */
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

  /**
   * @property {WebpackBuilder.mergeConfig} mergeConfig
   */
  mergeConfig: function (configValues) {
    this.config = {
      ...this.config,
      ...configValues,
    }
  },

  /**
   * @property {WebpackBuilder.compile} compile
   */
  compile: function () {
    this.doHook('pre', this.state.options)

    this.mergeConfig(this.state.options.entry.make())
    this.mergeConfig(this.state.options.output.make())
    this.mergeConfig(this.state.options.rules.make())
    this.mergeConfig(this.state.options.optimization.make())
    this.mergeConfig(this.state.options.plugins.make())
    this.mergeConfig(this.state.options.resolve.make())
    this.mergeConfig(this.state.options.externals.make())
    this.mergeConfig(this.state.options.devServer.make())
    this.mergeConfig(this.state.options.general.make())

    this.doHook('post', this.config)

    return this.config
  },

  /**
   * @property {WebpackBuilder.doHook} doHook
   */
  doHook: function (name, ...params) {
    this.bud.hooks.call(`${name}_webpack`, this, params)
  },
})

export {webpackBuilder}

import type {Bud} from '../bud'
import type {Configuration} from 'webpack'
export type WebpackBuilder = {
  bud: Bud
  options: Object
  mergeConfig: (configValues: Object) => void
  compile: () => Configuration
  doHook: (name: string, ...any: any) => void
}
