declare global {
  let __resourceQuery: any

  interface Window {
    __whmEventSourceWrapper: any
  }
}

import Server from './Server'
export {Server}
