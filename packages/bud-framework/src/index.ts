import controller from './plugin/controller'
import container from './container'
import {
  dump,
  format,
  pretty,
  fs,
  helpers,
  highlight,
  logger,
  lo,
  notify,
  processHandler,
  terminate,
} from './util'
import {hooks} from './hooks'

process.on('unhandledRejection', processHandler)

/** 🌰 */
const framework = function (): void {
  this.apply = function (key, value) {
    this[key] = value
  }
}

/** Constructor for utilities. */
framework.prototype.util = {}
/** bail tools */
framework.prototype.dump = dump
framework.prototype.terminate = terminate
/** pino */
framework.prototype.logger = logger
/** fs-extra */
framework.prototype.fs = fs
/** lo! dash */
framework.prototype.lo = lo
/** prettier format */
framework.prototype.util.pretty = pretty
/** os-level notifications */
framework.prototype.util.notify = notify
/** format for console */
framework.prototype.util.format = format
/** syntax highlight for console */
framework.prototype.util.highlight = highlight
/** helpers */
framework.prototype.util.standardizeFilePaths =
  helpers.standardizeFilePaths

/** Bud hooks system */
framework.prototype.hooks = hooks

/** Container */
framework.prototype.container = container

/** File container */
const filestore = container
filestore.prototype.require = function (key) {
  require(this.get(key))
}
filestore.prototype.exists = function (key) {
  return this.fs.existsSync(this.get(key))
}
framework.prototype.files = filestore

/** Plugin container */
const pluginstore = container
framework.prototype.plugins = pluginstore
framework.prototype.controller = controller

export {framework as default}
