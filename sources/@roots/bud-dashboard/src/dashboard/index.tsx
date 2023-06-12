import type {StatsCompilation} from '@roots/bud-framework/config'

import {type Bud} from '@roots/bud-framework'

import App from './app.js'
import {TTYApp} from './input.js'

export interface Props {
  compilations: Array<StatsCompilation>
  context: Bud['context']
  devUrl?: URL
  displayAssets: boolean
  displayEntrypoints: boolean
  displayServerInfo: boolean
  isTTY?: boolean
  mode: Bud['mode']
  proxyUrl?: URL
  publicDevUrl?: URL
  publicProxyUrl?: URL
  watchFiles?: Set<string>
}

export {App, TTYApp}
