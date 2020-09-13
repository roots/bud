import filesystem from 'fs-extra'
import resolveFrom from 'resolve-from'
import path from 'path'

import controller from './plugin/controller'
import container from './container'
import {
  dump,
  format,
  globby,
  pretty,
  helpers,
  highlight,
  logger,
  lo,
  notify,
  processHandler,
  terminate,
} from './util'
import watcher from './watcher'
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
  return this.filesystem.existsSync(this.get(key))
}

filestore.prototype = {
  ...filestore.prototype,
  ...path, // nodepath
  ...filesystem, // fs-extra
  glob: globby, // globby
  from: resolveFrom, // resolveFrom
  watcher,

  base: process.cwd(),
  setBase: function (dir) {
    this.base = dir
  },

  setDisk: function (glob) {
    const files = this.glob.sync(glob, {gitignore: true})
    this.repository = files.reduce(
      (acc, curr) => ({
        ...acc,
        [curr.replace(`${this.base}/`, '')]: curr,
      }),
      {},
    )
  },
  get: function (key) {
    return this.from(this.base, key)
  },
  project: function (key) {
    return this.resolve(this.base, key)
  },
  read: function (key) {
    return this.readFileSync(this.get(key), 'utf8')
  },
  readJson: function (key) {
    return this.readJsonSync(this.get(key), 'utf8')
  },
  write: function (key, content) {
    this.writeFileSync(this.resolve(this.base, key), content)
  },
  writeJson: function (key, content) {
    this.writeJsonSync(this.resolve(this.base, key), content)
  },
}

framework.prototype.files = filestore

/** Plugin container */
const pluginstore = container
framework.prototype.plugins = pluginstore
framework.prototype.controller = controller

export {framework as default}
