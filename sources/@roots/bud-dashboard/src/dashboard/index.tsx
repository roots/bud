import type {StatsCompilation} from '@roots/bud-framework/config'
import type {BudHandler} from '@roots/bud-support/errors'

import {type Bud} from '@roots/bud-framework'

export {Application, TeletypeApplication} from './app.js'

export interface Props {
  basedir?: string
  close?: (callback: (error?: Error | null) => any) => void
  closed?: boolean
  compact?: boolean
  compilations?: Array<Partial<StatsCompilation>>
  debug?: boolean
  devUrl?: URL
  displayAssets?: boolean
  displayEntrypoints?: boolean
  displayServerInfo?: boolean
  error?: BudHandler
  errors?: StatsCompilation[`errors`]
  isolated?: number
  mode: Bud['mode']
  proxy?: boolean
  proxyUrl?: URL
  publicDevUrl?: URL
  publicProxyUrl?: URL
  status?: false | string
  warnings?: StatsCompilation[`warnings`]
}
