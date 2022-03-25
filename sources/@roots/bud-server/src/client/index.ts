/* eslint-disable no-console */
/* global __resourceQuery */

interface Controller {
  update: (payload) => void
}

interface BaseOptions {
  autoConnect: boolean
  timeout: number
  overlay: boolean
  reload: boolean
  log: boolean
  warn: boolean
  name: string
  overlayWarnings: boolean
  path: string
}

interface Options extends BaseOptions {
  'bud.overlay': boolean
  'bud.indicator': boolean
}

;(async (query: string) => {
  const querystring = await import('querystring')
  const hmr = await import('./bridge')

  const controllers: Array<Controller> = []

  const FALLBACK_OPTS: Options = {
    ['bud.overlay']: true,
    ['bud.indicator']: true,
    autoConnect: false,
    timeout: 20 * 1000,
    overlay: false,
    reload: false,
    log: false,
    warn: false,
    name: '',
    overlayWarnings: false,
    path: '/__bud/hmr',
  }

  const options: Options = Object.entries(
    querystring.parse(query.slice(1)),
  ).reduce((a: Options, [k, v]: [keyof Options, any]) => {
    if (v === 'true') v = true
    if (v === 'false') v = false
    return {...a, [k]: v}
  }, FALLBACK_OPTS)

  hmr.setOptionsAndConnect(options)

  const registerIndicator = async () => {
    if (!options['bud.indicator']) return
    const controllerModule = await import('./indicator/index.js')
    const controller = await controllerModule.make()
    controller?.update && controllers.push(controller)
  }

  const registerOverlay = async () => {
    if (!options['bud.overlay']) return
    const controllerModule = await import('./overlay/index.js')
    const controller = await controllerModule.make()
    controller?.update && controllers.push(controller)
  }

  await registerIndicator()
  await registerOverlay()

  hmr.subscribeAll(payload => {
    console.table({
      name: payload.name,
      action: payload.action,
      hash: payload.hash,
    })

    payload.warnings.map(console.warn)
    payload.errors.map(console.error)

    controllers.map(controller => controller.update(payload))

    if (payload.action === 'reload') window.location.reload()
  })
})(
  // @ts-ignore
  __resourceQuery as string,
)
