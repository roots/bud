/* eslint-disable no-console */

var options = {
  path: '/__bud/hmr',
  timeout: 20 * 1000,
  overlay: true,
  reload: false,
  log: true,
  warn: true,
  name: 'bud',
  autoConnect: true,
  overlayStyles: {},
  overlayWarnings: false,
  ansiColors: {},
}

//@ts-ignore
if (__resourceQuery) {
  var querystring = require('querystring')
  //@ts-ignore
  var overrides = querystring.parse(__resourceQuery.slice(1))
  setOverrides(overrides)
}

if (typeof window === 'undefined') {
  // do nothing
} else if (typeof window.EventSource === 'undefined') {
  console.warn(
    "webpack-hot-middleware's client requires EventSource to work. " +
      'You should include a polyfill if you want to support this browser: ' +
      'https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events#Tools',
  )
} else {
  if (options.autoConnect) {
    connect()
  }
}

function setOverrides(overrides) {
  if (overrides.autoConnect)
    options.autoConnect = overrides.autoConnect == 'true'
  if (overrides.path) options.path = overrides.path
  if (overrides.timeout) options.timeout = overrides.timeout
  if (overrides.overlay) options.overlay = overrides.overlay !== 'false'
  if (overrides.reload) options.reload = overrides.reload !== 'false'
  if (overrides.noInfo && overrides.noInfo !== 'false') {
    options.log = false
  }
  if (overrides.name) {
    options.name = overrides.name
  }
  if (overrides.quiet && overrides.quiet !== 'false') {
    options.log = false
    options.warn = false
  }

  if (overrides.dynamicPublicPath) {
    // @ts-ignore
    options.path = __webpack_public_path__ + options.path
  }

  if (overrides.ansiColors)
    options.ansiColors = JSON.parse(overrides.ansiColors)
  if (overrides.overlayStyles)
    options.overlayStyles = JSON.parse(overrides.overlayStyles)

  if (overrides.overlayWarnings) {
    options.overlayWarnings = overrides.overlayWarnings == 'true'
  }
}

function EventSourceWrapper() {
  var source
  var lastActivity = new Date()
  var listeners = []

  init()
  var timer = setInterval(function () {
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
    if (options.log) console.log('[HMR] connected')
    lastActivity = new Date()
  }

  function handleMessage(event) {
    lastActivity = new Date()
    for (var i = 0; i < listeners.length; i++) {
      listeners[i](event)
    }
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

function getEventSourceWrapper() {
  // @ts-ignore
  if (!window.__whmEventSourceWrapper) {
    // @ts-ignore
    window.__whmEventSourceWrapper = {}
  }
  // @ts-ignore
  if (!window.__whmEventSourceWrapper[options.path]) {
    // cache the wrapper for other entries loaded on
    // the same page with the same options.path
    // @ts-ignore
    window.__whmEventSourceWrapper[options.path] = EventSourceWrapper()
  }
  // @ts-ignore
  return window.__whmEventSourceWrapper[options.path]
}

function connect() {
  getEventSourceWrapper().addMessageListener(handleMessage)

  function handleMessage(event) {
    if (event.data == '\uD83D\uDC93') {
      return
    }
    try {
      processMessage(JSON.parse(event.data))
    } catch (ex) {
      if (options.warn) {
        console.warn('Invalid HMR message: ' + event.data + '\n' + ex)
      }
    }
  }
}

// the reporter needs to be a singleton on the page
// in case the client is being used by multiple bundles
// we only want to report once.
// all the errors will go to all clients
var singletonKey = '__webpack_hot_middleware_reporter__'
var reporter
if (typeof window !== 'undefined') {
  if (!window[singletonKey]) {
    window[singletonKey] = createReporter()
  }
  reporter = window[singletonKey]
}

function createReporter() {
  var {default: strip} = require('strip-ansi')

  var overlay

  var styles = {
    errors: 'color: #ff0000;',
    warnings: 'color: #999933;',
  }
  var previousProblems = null
  function log(type, obj) {
    var newProblems = obj[type]
      .map(function (problem) {
        var isNested = typeof problem === 'object'
        var message = isNested ? problem.message : problem
        return strip(message)
      })
      .join('\n')
    if (previousProblems == newProblems) {
      return
    } else {
      previousProblems = newProblems
    }

    var style = styles[type]
    var name = obj.name ? "'" + obj.name + "' " : ''
    var title =
      '[HMR] bundle ' + name + 'has ' + obj[type].length + ' ' + type
    // NOTE: console.warn or console.error will print the stack trace
    // which isn't helpful here, so using console.log to escape it.
    if (console.group && console.groupEnd) {
      console.group('%c' + title, style)
      console.log('%c' + newProblems, style)
      console.groupEnd()
    } else {
      console.log(
        '%c' + title + '\n\t%c' + newProblems.replace(/\n/g, '\n\t'),
        style + 'font-weight: bold;',
        style + 'font-weight: normal;',
      )
    }
  }

  return {
    cleanProblemsCache: function () {
      previousProblems = null
    },
    problems: function (type, obj) {
      if (options.warn) {
        log(type, obj)
      }
      if (overlay) {
        if (options.overlayWarnings || type === 'errors') {
          overlay.showProblems(type, obj[type])
          return false
        }
        overlay.clear()
      }
      return true
    },
    success: function () {
      if (overlay) overlay.clear()
    },
    useCustomOverlay: function (customOverlay) {
      overlay = customOverlay
    },
  }
}

const processUpdate = require('./update')

var customHandler
var subscribeAllHandler
function processMessage(obj) {
  switch (obj.action) {
    case 'building':
      if (options.log) {
        console.log(
          '[HMR] bundle ' +
            (obj.name ? "'" + obj.name + "' " : '') +
            'rebuilding',
        )
      }
      break
    case 'built':
      if (options.log) {
        console.log(
          '[HMR] bundle ' +
            (obj.name ? "'" + obj.name + "' " : '') +
            'rebuilt in ' +
            obj.time +
            'ms',
        )
      }
    // fall through
    case 'sync':
      if (obj.name && options.name && obj.name !== options.name) {
        return
      }
      var applyUpdate = true
      if (obj.errors.length > 0) {
        if (reporter) reporter.problems('errors', obj)
        applyUpdate = false
      } else if (obj.warnings.length > 0) {
        if (reporter) {
          var overlayShown = reporter.problems('warnings', obj)
          applyUpdate = overlayShown
        }
      } else {
        if (reporter) {
          reporter.cleanProblemsCache()
          reporter.success()
        }
      }
      if (applyUpdate) {
        processUpdate(obj.hash, obj.modules, options)
      }
      break
    default:
      if (customHandler) {
        customHandler(obj)
      }
  }

  if (subscribeAllHandler) {
    subscribeAllHandler(obj)
  }
}

export function subscribeAll(handler) {
  subscribeAllHandler = handler
}

export function subscribe(handler) {
  customHandler = handler
}

export function useCustomOverlay(customOverlay) {
  if (reporter) reporter.useCustomOverlay(customOverlay)
}

export function setOptionsAndConnect(overrides) {
  setOverrides(overrides)
  connect()
}
