import type {Bud} from '..'

type UseExtension = (this: Bud, plugin: any) => Bud

const use: UseExtension = function (this: Bud, plugins: any[]): Bud {
  const controller = this.plugins.controller(this)

  plugins.map(plugin => {
    controller.build(plugin)
  })

  return this
}

export {use}
export type {UseExtension}
