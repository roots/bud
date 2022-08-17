/* eslint-disable no-console */
/* global __resourceQuery */

import intercept from './intercept'

window.requestAnimationFrame(async function ready() {
  if (!__resourceQuery) return
  const params = new URLSearchParams(__resourceQuery)

  if (!params) return
  const href = params.get(`href`)

  if (!href) return
  const origin = decodeURI(href)

  return document.body
    ? intercept(origin)
    : window.requestAnimationFrame(ready)
})
