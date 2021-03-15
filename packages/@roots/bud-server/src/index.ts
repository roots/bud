declare global {
  interface Window {
    __whmEventSourceWrapper: any
    bud: any
  }
}

import Server from './Server'
export {Server}
