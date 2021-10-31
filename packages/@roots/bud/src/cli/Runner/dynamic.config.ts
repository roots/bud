import {Bud} from '../..'

export const config = async (app: Bud) => {
  if (app.project.isFunction('configs.dynamic.global.config')) {
    const config = app.project.get(
      'configs.dynamic.global.config',
    )
    await config(app)
  }

  if (
    app.project.isFunction('configs.dynamic.conditional.config')
  ) {
    const config = app.project.get(
      'configs.dynamic.conditional.config',
    )
    await config(app)
  }
}
