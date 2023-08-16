import * as Indicator from '@roots/bud-client/hot/components/indicator'
import * as Overlay from '@roots/bud-client/hot/components/overlay'

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
