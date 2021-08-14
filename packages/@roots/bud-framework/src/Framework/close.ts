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

  setTimeout(
    () =>
      existsAndIsCallable(this.server?.instance?.close) &&
      this.server.instance.close(() => {
        existsAndIsCallable(this.server?.watcher?.close) &&
          this.server.watcher.close()
      }),
    10,
  )
}

export {close}
