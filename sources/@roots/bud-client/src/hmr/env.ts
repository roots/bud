/// <reference types="webpack-env" />

import {Events} from './events'

declare global {
  interface Window {
    __budEventSource: {
      [key: string]: Events
    }
  }
}
