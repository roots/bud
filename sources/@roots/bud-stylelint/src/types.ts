/// <reference types="@roots/bud" />

import type {PublicExtensionApi} from '@roots/bud-framework/extension'

import type BudStylelint from './extension.js'

declare module '@roots/bud-framework' {
  interface Bud {
    stylelint: PublicApi
  }

  interface Modules {
    '@roots/bud-stylelint': PublicApi
  }
}

interface PublicApi extends PublicExtensionApi<BudStylelint> {
  cache: BudStylelint['cache']
  cacheLocation: BudStylelint['cacheLocation']
  config: BudStylelint['config']
  context: BudStylelint['context']
  fix: BudStylelint['fix']
  stylelintPath: BudStylelint['stylelintPath']

  setCache: BudStylelint['setCache']
  getCache: BudStylelint['getCache']

  setCacheLocation: BudStylelint['setCacheLocation']
  getCacheLocation: BudStylelint['getCacheLocation']

  setContext: BudStylelint['setContext']
  getContext: BudStylelint['getContext']

  setFix: BudStylelint['setFix']
  getFix: BudStylelint['getFix']

  setConfig: BudStylelint['setConfig']
  getConfig: BudStylelint['getConfig']

  failOnError: BudStylelint['failOnError']
  failOnWarning: BudStylelint['failOnWarning']

  setStylelintPath: BudStylelint['setStylelintPath']
  getStylelintPath: BudStylelint['getStylelintPath']
}
