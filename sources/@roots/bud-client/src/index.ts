/* eslint-disable no-console */
/* global __resourceQuery */

import './interface'

import type {StatsCompilation} from 'webpack'

import * as components from './components/index.js'
import * as hmr from './hmr/index.js'
import * as options from './options'

/**
 * Current runtime environment supports HMR
 *
 * @public
 */
const environmentIsSupported = async () => {
  if (typeof window === `undefined`) return false

  if (typeof window?.EventSource === `undefined`) {
    console.error(`[bud] The hot middleware client requires EventSource to work. \
This browser requires a polyfill: https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools \
`)
    return false
  }

  if (typeof module?.hot === `undefined`) {
    console.error(`[bud] hmr is unavailable`)
    return false
  }

  return true
}

/**
 *Initialize bud.js client tooling
 *
 * @public
 */
const initialize = async () => {
  if (!environmentIsSupported()) return

  /* Set client options from URL params */
  const clientOptions = options.setFromParameters(__resourceQuery)

  if (!hmr.cache[clientOptions.name]) {
    hmr.cache[clientOptions.name] = new hmr.Cache(clientOptions.name)
  }

  const cache = hmr.cache[clientOptions.name]

  /* Instantiate indicator, overlay */
  await components.make(clientOptions)

  const check = () => {
    module.hot.status() === `idle` &&
      module.hot
        .check(false, update)
        ?.then((modules: StatsCompilation['modules']) => {
          if (!modules) return
          update(null, modules)
        })
        ?.catch(update)
  }

  const apply = (error?: Error, modules?: StatsCompilation['modules']) => {
    if (!modules) return

    if (error) console.error(`[bud] error`)

    if (cache.isStale()) check()
  }

  const update = (error: Error, modules?: StatsCompilation['modules']) => {
    if (!modules) return

    module.hot
      .apply(
        {
          ignoreUnaccepted: true,
          ignoreDeclined: true,
          ignoreErrored: true,
          onAccepted: ({moduleId}) => {
            console.log(`[${clientOptions.name}] ${moduleId} updated`)
          },
          onUnaccepted: () => {
            console.warn(
              `[${clientOptions.name}] unaccepted module(s). full page reload needed`,
            )
            clientOptions.reload && window.location.reload()
          },
          onDeclined: () => {
            console.warn(
              `[${clientOptions.name}] declined module(s). full page reload needed`,
            )
            clientOptions.reload && window.location.reload()
          },
          onErrored: error => {
            console.error(
              `[${error?.moduleId ?? clientOptions.name}]`,
              error?.error ?? `error`,
            )
          },
        },
        apply,
      )
      ?.then((modules: StatsCompilation['modules']) => {
        if (modules) apply(null, modules)
      })
      ?.catch(apply)
  }

  /* Instantiate HMR event source and register client listeners */
  hmr.events
    .make(clientOptions)
    .addMessageListener((event: MessageEvent) => {
      try {
        const payload = JSON.parse(event.data)

        if (payload.action === `reload`) window.location.reload()

        components.controllers.map(controller =>
          controller.update(payload),
        )

        if (cache.isStale(payload.hash)) check()
      } catch (error) {}
    })
}

initialize()
