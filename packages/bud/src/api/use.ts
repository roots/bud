import type {Bud} from '..'
import {isArray} from 'lodash'

export declare type UsePlugin = (
  this: Bud,
  plugins: any | any[],
) => Bud

const use: UsePlugin = function (plugins): Bud {
  if (isArray(plugins)) {
    plugins.forEach(plugin => {
      typeof plugin == 'function'
        ? this.controller.use(plugin).build()
        : null
    })
  } else {
    this.controller.use(plugins).build()
  }

  return this
}

export {use}
