/* eslint-disable no-console */
/* global __resourceQuery */
/* istanbul ignore file */

import {Payload} from './hmr/interface'

// @ts-ignore
;(async () => {
  /**
   * Bounce early if elements are already defined
   */
  const isAlreadyDefined =
    customElements.get('activity-indicator') ||
    customElements.get('overlay')

  if (isAlreadyDefined) return

  const {IndicatorController} = await import(
    './components/indicator/indicator.controller'
  )
  const {OverlayController} = await import(
    './components/overlay/overlay.controller'
  )
  const indicator = new IndicatorController()
  const overlay = new OverlayController()

  const client = await makeClient()

  client.events.addListener(({data}: Payload) => {
    if (data.action === 'reload') window.location.reload()

    indicator.update(data)
    overlay.update(data)

    console.log(
      `%c[bud]%c %c${data.action}`,
      'background: #525ddc; color: #ffffff;',
      'background: transparent;',
      'background: white; color: #343a40;',
    )
  })
})()

const makeClient = async () => {
  const [{Client}, {options}] = await Promise.all([
    import('./hmr'),
    import('./options'),
  ])

  return new Client(options)
}
