/* eslint-disable no-console */
/* global __resourceQuery */

import client from './client.js'

// @ts-ignore
const webpackHot: __WebpackModuleApi.Hot = import.meta
  ? // @ts-ignore
    import.meta.webpackHot
  : module.hot

;(async () => await client(__resourceQuery, webpackHot))()
