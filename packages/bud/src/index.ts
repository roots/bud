import framework from '@roots/bud-framework'
import compiler from '@roots/bud-compiler'
import express from 'express'
import api from './api'

import {repositories} from './repositories'
import {config} from './config'

import {Bud} from '@roots/bud-types'

const bootstrap = new framework()

bootstrap.compiler = compiler
bootstrap.config = config
bootstrap.server = express()

repositories.stores.forEach(store => {
  bootstrap[store.name] = new bootstrap.container(store.register)
})

repositories.files.forEach(store => {
  bootstrap[store.name] = new bootstrap.files(store.register)
})

bootstrap.fs = new bootstrap.files()

repositories.plugins.forEach(store => {
  bootstrap[store.name] = new bootstrap.plugins(store.register)
  bootstrap[store.name].controller = new bootstrap.controller(
    bootstrap,
  )
})

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

bootstrap.hooks = bootstrap.hooks(bootstrap)
bootstrap.format = bootstrap.util.format

/**
 * Binding config API methods
 */
bootstrap.api = api
Object.entries(api).forEach(([name, method]) => {
  bootstrap[name] = method
})

/** Type achieved. */
const bud: Bud = bootstrap

/**
 * Set mode from env if available
 */
if (bud.args.has('env')) {
  bud.mode.set(bud.args.get('env'))
}

if (bud.args.has('project')) {
  bud.paths.set('project', bud.args.get('project'))
}

/**
 * Filesystem
 */
bud.fs.base = bud.paths.get('project') || bud.fs.cwd
bud.fs.setDisk([
  bud.fs.resolve(bud.fs.base, '**/*'),
  '!node_modules',
  '!vendor',
])

/**
 * Set babel config
 */
bud.configs.has('babel') &&
  bud.options.merge('babel', bud.configs.get('babel'))

/**
 * Get babel config
 */
bud.configs.has('postcss') &&
  bud.options.merge('postcss', bud.configs.get('postcss'))

module.exports = bud
export type {Bud}
