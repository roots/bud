/* eslint-disable no-console */
/* global __resourceQuery */
/* global module */

;(async () =>
  await import(`./client.js`).then(
    async module =>
      await module.client(__resourceQuery, import.meta.webpackHot),
  ))()
