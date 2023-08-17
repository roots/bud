import * as Indicator from '@roots/bud-client/hot/components/indicator'
import * as Overlay from '@roots/bud-client/hot/components/overlay'

export const make: (
  options: Options,
) => Promise<Array<Controller>> = async options => {
  if (options.indicator && !customElements.get(`bud-activity-indicator`)) {
    const indicator = Indicator.make()
    if (indicator) maybePushController(indicator)
  }

  if (options.overlay && !customElements.get(`bud-error`)) {
    const overlay = Overlay.make()
    if (overlay) maybePushController(overlay)
  }

  return window.bud.controllers ?? []
}

const maybePushController = (controller: any) => {
  if (!controller) return
  window.bud.controllers?.push(controller)
}
