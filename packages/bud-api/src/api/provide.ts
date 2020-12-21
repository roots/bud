import type {Framework} from '@roots/bud-typings'
import {isString} from '@roots/bud-support'

export const provide: Provide = function (options) {
  const plugin = this.extensions.get('webpack-provide-plugin')

  Object.entries(options).forEach(([module, alias]) => {
    isString(alias)
      ? plugin.set(alias as string, module)
      : (alias as string[]).map(alias =>
          plugin.set(alias, module),
        )
  })

  return this
}

export type Provide = (
  this: Framework,
  options: {
    [key: string]: string | string[]
  },
) => Framework
