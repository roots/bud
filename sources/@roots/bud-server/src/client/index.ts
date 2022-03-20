/* global __resourceQuery */

;(async (query: string) => {
  const querystring = await import('querystring')
  const hmr = await import('./bridge')
  const {IndicatorController} = await import(
    './indicator/indicator.controller'
  )
  const {OverlayController} = await import('./overlay/overlay.controller')

  const indicator = new IndicatorController()
  const overlay = new OverlayController()

  const instance = {
    path: '/__bud/hmr',
    timeout: 20 * 1000,
    overlay: true,
    log: false,
    warn: true,
    name: '',
    autoConnect: false,
    overlayWarnings: false,
    ...querystring.parse(query.slice(1)),
  }

  hmr.setOptionsAndConnect(instance)
  hmr.subscribeAll(payload => {
    if (payload.action === 'reload') window.location.reload()

    indicator.update(payload)
    overlay.update(payload)

    // eslint-disable-next-line no-console
    console.log(
      `%c[bud]%c %c${payload.action}`,
      'background: #525ddc; color: #ffffff;',
      'background: transparent;',
      'background: white; color: #343a40;',
    )
  })
})(
  // @ts-ignore
  __resourceQuery as string,
)
