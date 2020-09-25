import BudInterface from '../Bud'
import {Plugin} from 'webpack'

/**
 * Add webpack plugin.
 */
export type AddPlugin = (
  name: string,
  plugin: (bud?: BudInterface) => Plugin,
) => BudInterface

export const addPlugin: AddPlugin = function (name, plugin) {
  name &&
    plugin &&
    this.plugins.set(name, (bud: BudInterface) => ({
      bud,
      make: function () {
        return plugin(bud)
      },
    }))

  return this
}
