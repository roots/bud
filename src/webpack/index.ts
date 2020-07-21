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
const webpackBuilder: WebpackConstructor = (
  bud: bud,
): WebpackBuilder => ({
  /**
   * @property {WebpackBuilder.bud} bud
   */
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

  /**
   * @property {WebpackBuilder.doHook} doHook
   */
  doHook: function (name, ...params) {
    this.bud.hooks.call(`${name}_webpack`, this, params)
  },
})

export {webpackBuilder}

import type {bud} from '../bud'
import type {Configuration} from 'webpack'

export type WebpackConstructor = (
  bud: bud,
) => WebpackBuilder

export type WebpackBuilder = {
  bud: bud
  options: Object
  mergeConfig: (configValues: Object) => void
  compile: () => Configuration
  doHook: (name: string, ...any: any) => void
}
