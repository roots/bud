/* eslint-disable no-console */
/* global __resourceQuery */

import intercept from './index.js'

window.requestAnimationFrame(async function ready() {
  if (!__resourceQuery) return

  const params = new URLSearchParams(__resourceQuery)
  if (!params) return

  const searchUri = params.get(`search`)
  if (!searchUri) return
  const search = decodeURI(searchUri)

  const replaceUri = params.get(`replace`)
  if (!replaceUri) return
  const replace = decodeURI(replaceUri)

  return document.body
    ? intercept(search, replace)
    : window.requestAnimationFrame(ready)
})
