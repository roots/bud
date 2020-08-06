import type {Use, Bud} from './types'

const use: Use = function (this: Bud, plugins: any[]): Bud {
  this.logger.info(
    {
      name: 'api.use',
      plugins,
    },
    'api.use called',
  )

  plugins.forEach(plugin => {
    this.plugins.add({
      name: plugin.name,
      extension: plugin,
    })
  })

  const controller = this.plugins.controller(this)

  this.plugins.entries().map(plugin => {
    controller.build(plugin)
  })

  return this
}

export {use}
