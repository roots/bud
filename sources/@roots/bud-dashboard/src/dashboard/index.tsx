import type {StatsCompilation} from '@roots/bud-framework/config'

import {type Bud} from '@roots/bud-framework'

export {Application, TeletypeApplication} from './app.js'

export interface Props {
  close?: (callback: (error?: Error | null) => any) => void
  closed?: boolean
  compilations: Array<StatsCompilation>
  context: Bud[`context`]
  debug: boolean
  devUrl?: URL
  displayAssets?: boolean
  displayDebug?: boolean
  displayEntrypoints?: boolean
  displayServerInfo?: boolean
  mode: Bud['mode']
  proxy?: boolean
  proxyUrl?: URL
  status?: false | string
  watchFiles?: Set<string>
}
