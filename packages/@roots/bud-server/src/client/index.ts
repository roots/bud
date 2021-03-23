const client = require('webpack-hot-middleware/client?quiet=true')
const {overlay} = require('./ErrorOverlay')
const {indicator} = require('./Indicator')

/**
 * Client
 */
const run = async () => {
  const res = await fetch('/__roots/config.json')
  const server = await res.json()

  server.browser.log &&
    (() => {
      console.info(`[Bud] Development mode`)
      console.info(
        `[Bud] You should NOT be seeing this message in production.`,
      )
    })()

  /**
   * Instantiate overlay
   */
  server.browser.overlay && client.useCustomOverlay(overlay)

  /**
   * Loading indicator
   */
  server.browser.indicator &&
    (() => {
      indicator.init()

      client.subscribeAll(payload => {
        const reload = payload?.action == 'reload'
        const complete = payload?.action == 'built'
        const pending = payload?.action == 'building'
        const hasWarnings = payload?.warnings?.length > 0
        const hasErrors = payload?.errors?.length > 0

        server.browser.log &&
          (() => {
            hasWarnings &&
              console.warn('[Bud] Warning', payload.warnings)

            hasErrors &&
              console.error('[Bud] Error', payload.errors)

            pending && console.log('[Bud] Compiling...')

            complete &&
              !hasErrors &&
              !hasWarnings &&
              console.log(
                `[Bud] Compilation success [${payload.hash}] (${payload.time}ms)`,
              )

            reload &&
              console.log(
                `[Bud] Project template modified. Reloading now.`,
              )
          })()

        reload && indicator.reload()

        payload &&
          indicator.update({
            payload,
            complete,
            pending,
            hasWarnings,
            hasErrors,
          })
      })
    })()
}

run()
