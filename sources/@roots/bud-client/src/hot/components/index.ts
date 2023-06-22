import * as Indicator from './indicator/index.js'
import * as Overlay from './overlay/index.js'

export const make: (
  options: Options,
) => Promise<Array<Controller>> = async options => {
  if (options.indicator && !customElements.get(`bud-activity-indicator`)) {
    maybePushController(Indicator.make())
  }

  if (options.overlay && !customElements.get(`bud-error`)) {
    maybePushController(Overlay.make())
  }

  return window.bud.controllers
}

const maybePushController = (controller: Controller | undefined) => {
  if (!controller) return
  window.bud.controllers.push(controller)
}
