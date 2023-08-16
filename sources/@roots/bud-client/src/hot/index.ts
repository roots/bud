/* eslint-disable no-console */
/* global __resourceQuery */
/* global module */

;(async function () {
  const {initializeClient} = await import(`@roots/bud-client/hot/client`)
  await initializeClient(__resourceQuery, import.meta.webpackHot).catch(console.error)
})()
