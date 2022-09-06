let controllers: Array<Controller> = []

const make: (
  options: Options,
) => Promise<Array<Controller>> = async options => {
  if (options.indicator && !customElements.get(`bud-activity-indicator`)) {
    await import(`./indicator/index.js`)
      .then(async controller => await controller.make())
      .then(controller => controllers.push(controller))
  }

  if (options.overlay && !customElements.get(`bud-error`)) {
    await import(`./overlay/index.js`)
      .then(async controller => await controller.make())
      .then(controller => controllers.push(controller))
  }

  return controllers
}

export {controllers, make}
