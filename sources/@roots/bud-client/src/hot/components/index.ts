interface ControllerModule {
  make: () => Promise<Controller>
}

export const make: (
  options: Options,
) => Promise<Array<Controller>> = async options => {
  if (options.indicator && !customElements.get(`bud-activity-indicator`)) {
    await import(`./indicator/index.js`)
      .then(makeController)
      .then(maybePushController)
  }

  if (options.overlay && !customElements.get(`bud-error`)) {
    await import(`./overlay/index.js`)
      .then(makeController)
      .then(maybePushController)
  }

  return window.bud.controllers
}

const makeController = async (
  module: ControllerModule,
): Promise<Controller | undefined> => {
  if (!module) return
  return await module.make()
}

const maybePushController = (controller: Controller | undefined) => {
  if (!controller) return
  window.bud.controllers.push(controller)
}
