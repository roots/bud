import Framework from '@roots/bud-typings'

import {
  PluginTarget,
  PluginOptions,
  PluginItem,
  TransformOptions,
} from '@babel/core'

/**
 * Bud.Babel
 */
export as namespace Babel

export interface Babel {
  bud: Framework.Bud
  methods: Array<[string, Babel.Config]>
  init: Framework.Fluent<Babel>
  next: (this: Babel) => Framework.Bud
}

/**
 * Babel plugins.
 */
export {
  PluginTarget,
  PluginOptions,
  PluginItem,
  TransformOptions
}
export type Plugin = [PluginItem, PluginOptions]

/**
 * Babel configuration utility.
 */
export type Config = Framework.Fluent<Babel>

/**
 * Babel configuration utility constructor.
 */
export type Factory = (bud: Framework.Bud) => Babel
