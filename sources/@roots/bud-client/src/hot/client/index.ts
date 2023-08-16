/* eslint-disable no-console */
/* global __resourceQuery */
/* global __webpack_hash__ */

import * as components from '@roots/bud-client/hot/components'
import {injectEvents} from '@roots/bud-client/hot/events'
import {makeLogger} from '@roots/bud-client/hot/log'
import * as clientOptions from '@roots/bud-client/hot/options'

/**
 * Initializes bud.js HMR handling
 */
export const initializeClient = async (
  queryString: string,
  webpackHot: __WebpackModuleApi.Hot,
) => {
  /* Guard: EventSource browser support */
  if (typeof window?.EventSource === `undefined`) {
    console.error(
      `[bud] hot module reload requires EventSource to work. https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools`,
    )
    return false
  }
  /* Guard: webpackHot api availability */
  if (!webpackHot) {
    console.error(
      `[bud] hot module reload requires the webpack hot api to be available`,
    )
    return false
  }

  /* Set client options from URL params */
  const options = clientOptions.setFromParameters(queryString)
  /* Setup logger */
  const logger = makeLogger(options)

  window.bud = {
    ...window.bud ?? {},
    controllers: [...window.bud?.controllers ?? []],
    current: {
      ...window.bud?.current ?? {},
      [options.name]: window.bud?.current?.[options.name] ?? null,
    },
    hmr: {...window.bud?.hmr ?? {}},
    listeners: {...window.bud?.listeners ?? {}},
  }

  const isStale = (hash?: string): boolean => {
    if (hash) window.bud.current[options.name] = hash
    return __webpack_hash__ === window.bud.current[options.name]
  }

  /**
   * Webpack HMR check handler
   */
  const check = async () => {
    if (webpackHot.status() === `idle`) {
      await webpackHot.check(false)

      requestAnimationFrame(async function whenReady() {
        if (webpackHot.status() === `ready`) {
          await webpackHot
            .apply({
              ignoreDeclined: true,
              ignoreErrored: true,
              ignoreUnaccepted: true,
              onDeclined: onUnacceptedOrDeclined,
              onErrored: (error: any) => {
                window.bud.controllers.map(
                  controller =>
                    controller?.update({
                      errors: [error],
                    }),
                )
              },
              onUnaccepted: onUnacceptedOrDeclined,
            })
            .catch(logger.error)

          if (!isStale()) await check()
        } else {
          requestAnimationFrame(whenReady)
        }
      })
    }
  }

  /**
   * Webpack HMR unaccepted module handler
   */
  const onUnacceptedOrDeclined = (
    info: __WebpackModuleApi.HotNotifierInfo,
  ) => {
    logger.warn(info.type, info)
    options.reload && window.location.reload()
  }

  /* Instantiate indicator, overlay */
  await components.make(options).catch(err => {})

  /* Instantiate eventSource */
  const events = injectEvents(EventSource).make(options)

  if (!window.bud.listeners?.[options.name]) {
    window.bud.listeners[options.name] = async payload => {
      if (!payload) return

      if (options.reload && payload.action === `reload`)
        return window.location.reload()

      if (payload.name !== options.name) return

      window.bud.controllers.map(controller => controller?.update(payload))

      if (payload.errors?.length > 0) return

      if (payload.action === `built` || payload.action === `sync`) {
        if (isStale(payload.hash)) return

        if (payload.action === `built`) {
          logger.log(`built in ${payload.time}ms`)
        }

        await check()
      }
    }

    /*
     * Instantiate HMR event source
     * and register client listeners
     */
    events.addListener(window.bud.listeners[options.name])
  }
}
