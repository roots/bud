/* eslint-disable no-console */
/* global __resourceQuery */
/* global module */

import {client} from './client.js'

/**
 * Client entrypoint
 */
;(async function () {
  try {
    await client(__resourceQuery, import.meta.webpackHot)
  } catch (err) {
    console.error(err)
  }
})()
