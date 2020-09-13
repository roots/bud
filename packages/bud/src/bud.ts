import framework from '@roots/bud-framework'
import compiler from '@roots/bud-compiler'
import express from 'express'
import api from './api'

import {loaderModules} from './loaders'
import plugins from './plugins'
import {config} from './config'
import {args} from './args'
import {env} from './env'
import features from './features'
import paths from './paths'
import options from './options'
import patterns from './patterns'
import rules from './rules'

import {Bud} from '@roots/bud-types'

/**
 * Instantiate @roots/bud-framework
 */
const bootstrap = new framework()

/**
 * Attach @roots/bud-compiler
 */
bootstrap.compiler = compiler

/**
 * Attach webpack config
 * @todo move to @roots/bud-compiler
 */
bootstrap.config = config

/**
 * Attach express instance (dev-server)
 */
bootstrap.server = express()

/**
 * Filesystem container
 */
bootstrap.fs = new bootstrap.files()

/**
 * CLI args container
 */
bootstrap.args = new bootstrap.container(args.register)

/**
 * Envvar container
 */
bootstrap.env = new bootstrap.container(env.register)

/**
 * Feature flags container
 */
bootstrap.features = new bootstrap.container(features.register)

/**
 * Loader modules container
 */
bootstrap.loaderModules = new bootstrap.container(loaderModules)

/**
 * General options store container
 */
bootstrap.options = new bootstrap.container(options.register)

/**
 * Paths container
 */
bootstrap.paths = new bootstrap.container(paths.register)

/**
 * RegExp patterns container
 */
bootstrap.patterns = new bootstrap.container(patterns.register)

/**
 * Webpack Ruleset container
 */
bootstrap.rules = new bootstrap.container(rules.register)

/**
 * Webpack plugins container
 */
bootstrap.plugins = new bootstrap.plugins(plugins)

/**
 * Instantiate plugins controller
 */
bootstrap.plugins.controller = new bootstrap.controller(
  bootstrap,
)

/**
 * Instantiate hooks container
 */
bootstrap.hooks = bootstrap.hooks(bootstrap)

/**
 * Run mode helper object
 */
bootstrap.mode = {
  is: function (check: 'production' | 'development') {
    return bootstrap.options.is('webpack.mode', check)
  },

  get: function () {
    return bootstrap.options.get('webpack.mode')
  },

  set: function (mode: 'production' | 'development') {
    bootstrap.options.set('webpack.mode', mode)

    return bootstrap
  },
}

/**
 * @todo remove this - may cause issues wherever this was used.
 */
bootstrap.format = bootstrap.util.format

/**
 * Bind API methods.
 */
bootstrap.api = api
Object.entries(api).forEach(([name, method]) => {
  bootstrap[name] = method
})

/**
 * Bud - build tools framework
 */
const bud: Bud = bootstrap

export {bud as default}
