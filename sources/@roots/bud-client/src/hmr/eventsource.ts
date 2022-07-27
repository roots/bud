/* eslint-disable no-console */
import type {Options} from './'

declare global {
  interface Window {
    __webpack_hash__: string
    __whmEventSourceWrapper: any
    __webpack_public_path__: string
  }
}

let eventSourceInstance: EventSource

export const create = (options: Options) => {
  let lastActivity: Date = new Date()
  let listeners: Array<((ev: MessageEvent) => any) | null> = []

  let timer = setInterval(function () {
    // @ts-ignore
    if (new Date() - lastActivity > options.timeout) {
      handleDisconnect()
    }
  }, options.timeout / 2)

  function init() {
    eventSourceInstance = new window.EventSource(options.path)
    eventSourceInstance.onopen = handleOnline
    eventSourceInstance.onerror = handleDisconnect
    eventSourceInstance.onmessage = handleMessage
  }

  function handleOnline() {
    console.log('[bud] connected')
    lastActivity = new Date()
  }

  function handleMessage(payload: MessageEvent) {
    lastActivity = new Date()

    if (!listeners?.length || !payload) return

    listeners?.forEach(listener =>
      typeof listener === 'function' ? listener(payload) : null,
    )
  }

  function handleDisconnect() {
    clearInterval(timer)
    eventSourceInstance.close()
    setTimeout(init, options.timeout)
  }

  init()

  return {
    addMessageListener: function (fn: (ev: MessageEvent) => unknown) {
      listeners.push(fn)
    },
  }
}

export const get = (
  options: Options,
): {
  addMessageListener: (fn: (ev: MessageEvent) => unknown) => unknown
} => {
  if (!window.__whmEventSourceWrapper) {
    window.__whmEventSourceWrapper = {}
  }

  if (!window.__whmEventSourceWrapper[options.path]) {
    window.__whmEventSourceWrapper[options.path] = create(options)
  }

  return window.__whmEventSourceWrapper[options.path]
}
