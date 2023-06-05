/* eslint-disable no-console */
/* global __resourceQuery */
/* global module */

import {client} from './client.js'

try {
  client(__resourceQuery, import.meta.webpackHot)
} catch (err) {
  console.error(err)

  try {
    client(__resourceQuery, module.hot)
  } catch (error) {
    console.error(error)
  }
}
