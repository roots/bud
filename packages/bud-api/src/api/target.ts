import {Framework} from '@roots/bud-typings'

export const target: Target = function (target) {
  this.config.set('target', target)

  return this
}

export type Target = (
  this: Framework,
  target: string,
) => Framework
