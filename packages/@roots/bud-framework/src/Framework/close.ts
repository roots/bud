import {isFunction} from 'lodash'

import type {Framework} from './'

interface close {
  (this: Framework, done?: CallableFunction): void
}

const existsAndIsCallable = (obj: unknown): boolean =>
  obj && isFunction(obj)

function close(this: Framework, done = process.exit) {
  if (existsAndIsCallable(this.dashboard?.instance?.unmount)) {
    this.dashboard.instance.unmount()
  }

  setTimeout(() => {
    if (existsAndIsCallable(this.compiler.instance?.close)) {
      this.compiler.instance.close(() => {
        if (existsAndIsCallable(this.server?.instance?.close)) {
          this.server.instance.close(() => {
            if (
              existsAndIsCallable(this.server?.watcher?.close)
            ) {
              this.server.watcher.close()
            }
          })
        }
      })
    }

    done()
  }, 10)
}

export {close}
