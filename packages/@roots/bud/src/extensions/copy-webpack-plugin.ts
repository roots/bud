import {Framework} from '@roots/bud-framework'
import Plugin from 'copy-webpack-plugin'
import {Module} from '@roots/bud-typings'

const HOOK_PATTERNS =
  'extension/webpack-copy-plugin/options/patterns'

export const name: Module['name'] = 'webpack-copy-plugin'

export const publish: Module['publish'] = app => ({
  [HOOK_PATTERNS]: () => [],
})

export const options: Module['options'] = (app: Framework) => ({
  patterns: app.subscribe(HOOK_PATTERNS),
})

export const make: Module['make'] = (options, app) =>
  new Plugin({patterns: app.subscribe(HOOK_PATTERNS)})

export const when: Module['when'] = app =>
  app.subscribe(HOOK_PATTERNS)?.length > 0
