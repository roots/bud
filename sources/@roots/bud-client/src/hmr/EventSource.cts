/* eslint-disable no-console */

declare global {
  interface Window {
    __webpack_hash__: string
    __whmEventSourceWrapper: any
    __webpack_public_path__: string
  }
}

export const createEventSource = options => {
  let source
  let lastActivity = new Date()
  let listeners = []

  init()

  let timer = setInterval(function () {
    // @ts-ignore
    if (new Date() - lastActivity > options.timeout) {
      handleDisconnect()
    }
  }, options.timeout / 2)

  function init() {
    source = new window.EventSource(options.path)
    source.onopen = handleOnline
    source.onerror = handleDisconnect
    source.onmessage = handleMessage
  }

  function handleOnline() {
    console.log('[bud] connected')
    lastActivity = new Date()
  }

  function handleMessage(event) {
    lastActivity = new Date()
    if (!listeners?.length || !event) return

    listeners?.forEach(listener => listener(event))
  }

  function handleDisconnect() {
    clearInterval(timer)
    source.close()
    setTimeout(init, options.timeout)
  }

  return {
    addMessageListener: function (fn) {
      listeners.push(fn)
    },
  }
}

export const getEventSource = options => {
  if (!window.__whmEventSourceWrapper) {
    window.__whmEventSourceWrapper = {}
  }

  if (!window.__whmEventSourceWrapper[options.path]) {
    window.__whmEventSourceWrapper[options.path] =
      createEventSource(options)
  }

  return window.__whmEventSourceWrapper[options.path]
}
