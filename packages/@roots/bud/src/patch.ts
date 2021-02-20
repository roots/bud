/**
 * This fixes issues with SWR thinking its in the browser.
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
require('events').EventEmitter.defaultMaxListeners = 20
