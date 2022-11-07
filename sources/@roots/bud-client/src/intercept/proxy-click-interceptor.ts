/* eslint-disable no-console */
/* global __resourceQuery */

import intercept from './index.js'

window.requestAnimationFrame(async function ready() {
  if (!__resourceQuery) return

  const params = new URLSearchParams(__resourceQuery)
  if (!params || !params.has(`search`) || !params.has(`replace`)) return

  const search = decodeURI(params.get(`search`))
  const replace = decodeURI(params.get(`replace`))

  return document.body
    ? intercept(search, replace)
    : window.requestAnimationFrame(ready)
})
