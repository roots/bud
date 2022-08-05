import * as options from '../options.js'

let controllers: Array<Controller> = []

const make: () => Promise<Array<Controller>> = async () => {
  if (options.get('indicator')) {
    await import('./indicator/index.js')
      .then(async controller => await controller.make())
      .then(controller => controllers.push(controller))
  }

  if (options.get('overlay')) {
    await import('./overlay/index.js')
      .then(async controller => await controller.make())
      .then(controller => controllers.push(controller))
  }

  return controllers
}

export {controllers, make}
