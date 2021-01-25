/**
 * This fixes issues with SWR thinking its in the browser.
 * @todo does this fix the vue extension issue?
 */
declare module NodeJS {
  interface Global {
    navigator: any
  }
}

global.navigator = {}

/**
 * This "fixes" resize emitter warnings
 * @todo actually fix this
 */
require('events').defaultMaxListeners = 20
