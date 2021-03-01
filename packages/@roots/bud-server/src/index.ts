declare global {
  let __resourceQuery: any
  interface Window {
    __whmEventSourceWrapper: any
    __bud: any
  }
}

import Server from './Server'
export {Server}
