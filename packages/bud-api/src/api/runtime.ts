import {Framework} from '@roots/bud-typings'

export const runtime = function (): Framework {
  this.features.set('runtimeChunk', true)

  return this
}

export type Runtime = (this: Framework) => Framework
