declare global {
  let __resourceQuery: any
  interface Window {
    __whmEventSourceWrapper: any
    bud: any
    Moon: any
  }
}

import Server from './Server'
export {Server}
