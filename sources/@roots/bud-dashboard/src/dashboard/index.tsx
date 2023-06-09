import type {Bud} from '@roots/bud-framework/bud'
import type {StatsCompilation} from '@roots/bud-framework/config'

import App from './app.js'
import {TTYApp} from './input.js'

export interface Props {
  isTTY?: boolean
  context: Bud['context']
  devUrl?: URL
  publicDevUrl?: URL
  mode: Bud['mode']
  proxyUrl?: URL
  publicProxyUrl?: URL
  compilations: Array<StatsCompilation>
  watchFiles?: Set<string>
  displayAssets: boolean
  displayEntrypoints: boolean
  displayServerInfo: boolean
}

export {App, TTYApp}
