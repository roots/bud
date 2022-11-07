export const make: (
  options: Options,
) => Promise<Array<Controller>> = async options => {
  if (window.bud.controllers.length > 0) return window.bud.controllers

  if (options.indicator && !customElements.get(`bud-activity-indicator`)) {
    await import(`./indicator/index.js`)
      .then(async controller => await controller.make())
      .then(controller => window.bud.controllers.push(controller))
  }

  if (options.overlay && !customElements.get(`bud-error`)) {
    await import(`./overlay/index.js`)
      .then(async controller => await controller.make())
      .then(controller => window.bud.controllers.push(controller))
  }

  return window.bud.controllers
}
