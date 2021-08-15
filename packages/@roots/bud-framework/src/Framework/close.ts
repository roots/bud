import {isFunction} from 'lodash'

import type {Framework} from './'

interface close {
  (this: Framework): void
}

const existsAndIsCallable = (obj: unknown): boolean =>
  obj && isFunction(obj)

function close(this: Framework) {
  existsAndIsCallable(this.dashboard?.instance?.unmount) &&
    this.dashboard.instance.unmount()

  this.isDevelopment && this.server
    ? setTimeout(() => {
        this.server.close()
        existsAndIsCallable(this.server?.watcher?.close) &&
          this.server.watcher.close()

        !process.env.BUD_KEEP_ALIVE && process.exit()
      }, 10)
    : !process.env.BUD_KEEP_ALIVE && process.exit()
}

export {close}
