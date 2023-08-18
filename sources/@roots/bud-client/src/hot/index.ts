/* eslint-disable no-console */
/* global __resourceQuery */
/* global module */

import {initializeClient} from '@roots/bud-client/hot/client'

;(async function () {
  if (!import.meta.webpackHot) return
  await initializeClient(__resourceQuery, import.meta.webpackHot).catch(console.error)
})()
