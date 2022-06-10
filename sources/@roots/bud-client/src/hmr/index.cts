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
  const hmr = await import('./bridge.cjs')

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
    name: 'bud',
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
  console.info(options)

  if (options['bud.indicator']) {
    const controllerModule = await import(
      '../components/indicator/index.cjs'
    )
    const controller = await controllerModule.make()
    controller?.update && controllers.push(controller)

    console.info(controllers)
  }

  if (options['bud.overlay']) {
    const controllerModule = await import(
      '../components/overlay/index.cjs'
    )
    const controller = await controllerModule.make()
    controller?.update && controllers.push(controller)

    console.info(controllers)
  }

  hmr.subscribeAll(payload => {
    if (!payload) return
    console.info(payload)

    payload.warnings?.map(console.warn)
    payload.errors?.map(console.error)

    controllers.map(controller => controller.update(payload))

    if (payload.action === 'reload') window.location.reload()
  })
})(
  // @ts-ignore
  __resourceQuery as string,
)
