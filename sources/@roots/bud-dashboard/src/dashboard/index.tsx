import type {StatsCompilation} from '@roots/bud-framework/config'
import type {BudHandler} from '@roots/bud-support/errors'

import {type Bud} from '@roots/bud-framework'

export {Application, TeletypeApplication} from './app.js'

export interface Props {
  close?: (callback: (error?: Error | null) => any) => void
  closed?: boolean
  collapsed?: boolean
  compilations?: Array<StatsCompilation>
  context: Bud[`context`]
  debug: boolean
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
  status?: false | string
  warnings?: StatsCompilation[`warnings`]
}
