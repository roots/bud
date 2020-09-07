import framework from '@roots/bud-framework'
import compiler from '@roots/bud-compiler'
import express from 'express'
import api from './api'

import {repositories} from './repositories'
import {config} from './config'

import {Bud} from '@roots/bud-typings'

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

repositories.plugins.forEach(store => {
  bootstrap[store.name] = new bootstrap.plugins(store.register)
  bootstrap[store.name].controller = new bootstrap.controller(
    bootstrap,
  )
})

bootstrap.mode = bootstrap.args.get('mode')
bootstrap.inDevelopment = bootstrap.args.is(
  'mode',
  'development',
)
bootstrap.inProduction = bootstrap.args.is('mode', 'production')

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
