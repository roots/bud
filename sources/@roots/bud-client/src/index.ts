/* eslint-disable no-console */
/* global __resourceQuery */
/* global __webpack_hash__ */

import client from './client.js'

// @ts-ignore
const webpackHot: __WebpackModuleApi.Hot = import.meta
  ? // @ts-ignore
    import.meta.webpackHot
  : module.hot

;(async () =>
  await client(__resourceQuery, webpackHot, __webpack_hash__))()
