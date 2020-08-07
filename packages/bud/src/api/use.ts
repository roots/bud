import type {Use, Bud} from './types'

const use: Use = function (this: Bud, plugins: any[]): Bud {
  const controller = this.plugins.controller(this)

  plugins.map(plugin => {
    controller.build(plugin)
  })

  return this
}

export {use}
