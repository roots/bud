'use strict'

var require$$0$1 = require('path')
var require$$0$2 = require('child_process')
var require$$0 = require('fs')
var require$$0$3 = require('os')
var require$$0$4 = require('assert')
var require$$2 = require('events')
var require$$0$6 = require('buffer')
var require$$0$5 = require('stream')
var require$$2$1 = require('util')
var require$$1 = require('tty')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e
    ? e
    : {default: e}
}

var require$$0__default$1 =
  /*#__PURE__*/ _interopDefaultLegacy(require$$0$1)
var require$$0__default$2 =
  /*#__PURE__*/ _interopDefaultLegacy(require$$0$2)
var require$$0__default =
  /*#__PURE__*/ _interopDefaultLegacy(require$$0)
var require$$0__default$3 =
  /*#__PURE__*/ _interopDefaultLegacy(require$$0$3)
var require$$0__default$4 =
  /*#__PURE__*/ _interopDefaultLegacy(require$$0$4)
var require$$2__default =
  /*#__PURE__*/ _interopDefaultLegacy(require$$2)
var require$$0__default$6 =
  /*#__PURE__*/ _interopDefaultLegacy(require$$0$6)
var require$$0__default$5 =
  /*#__PURE__*/ _interopDefaultLegacy(require$$0$5)
var require$$2__default$1 =
  /*#__PURE__*/ _interopDefaultLegacy(require$$2$1)
var require$$1__default =
  /*#__PURE__*/ _interopDefaultLegacy(require$$1)

var commonjsGlobal =
  typeof globalThis !== 'undefined'
    ? globalThis
    : typeof window !== 'undefined'
    ? window
    : typeof global !== 'undefined'
    ? global
    : typeof self !== 'undefined'
    ? self
    : {}

var execa$2 = {exports: {}}

var crossSpawn$1 = {exports: {}}

var windows = isexe$3
isexe$3.sync = sync$2

var fs$2 = require$$0__default['default']

function checkPathExt(path, options) {
  var pathext =
    options.pathExt !== undefined
      ? options.pathExt
      : process.env.PATHEXT

  if (!pathext) {
    return true
  }

  pathext = pathext.split(';')
  if (pathext.indexOf('') !== -1) {
    return true
  }
  for (var i = 0; i < pathext.length; i++) {
    var p = pathext[i].toLowerCase()
    if (p && path.substr(-p.length).toLowerCase() === p) {
      return true
    }
  }
  return false
}

function checkStat$1(stat, path, options) {
  if (!stat.isSymbolicLink() && !stat.isFile()) {
    return false
  }
  return checkPathExt(path, options)
}

function isexe$3(path, options, cb) {
  fs$2.stat(path, function (er, stat) {
    cb(er, er ? false : checkStat$1(stat, path, options))
  })
}

function sync$2(path, options) {
  return checkStat$1(fs$2.statSync(path), path, options)
}

var mode = isexe$2
isexe$2.sync = sync$1

var fs$1 = require$$0__default['default']

function isexe$2(path, options, cb) {
  fs$1.stat(path, function (er, stat) {
    cb(er, er ? false : checkStat(stat, options))
  })
}

function sync$1(path, options) {
  return checkStat(fs$1.statSync(path), options)
}

function checkStat(stat, options) {
  return stat.isFile() && checkMode(stat, options)
}

function checkMode(stat, options) {
  var mod = stat.mode
  var uid = stat.uid
  var gid = stat.gid

  var myUid =
    options.uid !== undefined
      ? options.uid
      : process.getuid && process.getuid()
  var myGid =
    options.gid !== undefined
      ? options.gid
      : process.getgid && process.getgid()

  var u = parseInt('100', 8)
  var g = parseInt('010', 8)
  var o = parseInt('001', 8)
  var ug = u | g

  var ret =
    mod & o ||
    (mod & g && gid === myGid) ||
    (mod & u && uid === myUid) ||
    (mod & ug && myUid === 0)

  return ret
}

var core$1
if (
  process.platform === 'win32' ||
  commonjsGlobal.TESTING_WINDOWS
) {
  core$1 = windows
} else {
  core$1 = mode
}

var isexe_1 = isexe$1
isexe$1.sync = sync

function isexe$1(path, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = {}
  }

  if (!cb) {
    if (typeof Promise !== 'function') {
      throw new TypeError('callback not provided')
    }

    return new Promise(function (resolve, reject) {
      isexe$1(path, options || {}, function (er, is) {
        if (er) {
          reject(er)
        } else {
          resolve(is)
        }
      })
    })
  }

  core$1(path, options || {}, function (er, is) {
    // ignore EACCES because that just means we aren't allowed to run it
    if (er) {
      if (
        er.code === 'EACCES' ||
        (options && options.ignoreErrors)
      ) {
        er = null
        is = false
      }
    }
    cb(er, is)
  })
}

function sync(path, options) {
  // my kingdom for a filtered catch
  try {
    return core$1.sync(path, options || {})
  } catch (er) {
    if (
      (options && options.ignoreErrors) ||
      er.code === 'EACCES'
    ) {
      return false
    } else {
      throw er
    }
  }
}

const isWindows =
  process.platform === 'win32' ||
  process.env.OSTYPE === 'cygwin' ||
  process.env.OSTYPE === 'msys'

const path$3 = require$$0__default$1['default']
const COLON = isWindows ? ';' : ':'
const isexe = isexe_1

const getNotFoundError = cmd =>
  Object.assign(new Error(`not found: ${cmd}`), {code: 'ENOENT'})

const getPathInfo = (cmd, opt) => {
  const colon = opt.colon || COLON

  // If it has a slash, then we don't bother searching the pathenv.
  // just check the file itself, and that's it.
  const pathEnv =
    cmd.match(/\//) || (isWindows && cmd.match(/\\/))
      ? ['']
      : [
          // windows always checks the cwd first
          ...(isWindows ? [process.cwd()] : []),
          ...(
            opt.path ||
            process.env.PATH ||
            /* istanbul ignore next: very unusual */ ''
          ).split(colon),
        ]
  const pathExtExe = isWindows
    ? opt.pathExt || process.env.PATHEXT || '.EXE;.CMD;.BAT;.COM'
    : ''
  const pathExt = isWindows ? pathExtExe.split(colon) : ['']

  if (isWindows) {
    if (cmd.indexOf('.') !== -1 && pathExt[0] !== '')
      pathExt.unshift('')
  }

  return {
    pathEnv,
    pathExt,
    pathExtExe,
  }
}

const which$1 = (cmd, opt, cb) => {
  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }
  if (!opt) opt = {}

  const {pathEnv, pathExt, pathExtExe} = getPathInfo(cmd, opt)
  const found = []

  const step = i =>
    new Promise((resolve, reject) => {
      if (i === pathEnv.length)
        return opt.all && found.length
          ? resolve(found)
          : reject(getNotFoundError(cmd))

      const ppRaw = pathEnv[i]
      const pathPart = /^".*"$/.test(ppRaw)
        ? ppRaw.slice(1, -1)
        : ppRaw

      const pCmd = path$3.join(pathPart, cmd)
      const p =
        !pathPart && /^\.[\\\/]/.test(cmd)
          ? cmd.slice(0, 2) + pCmd
          : pCmd

      resolve(subStep(p, i, 0))
    })

  const subStep = (p, i, ii) =>
    new Promise((resolve, reject) => {
      if (ii === pathExt.length) return resolve(step(i + 1))
      const ext = pathExt[ii]
      isexe(p + ext, {pathExt: pathExtExe}, (er, is) => {
        if (!er && is) {
          if (opt.all) found.push(p + ext)
          else return resolve(p + ext)
        }
        return resolve(subStep(p, i, ii + 1))
      })
    })

  return cb ? step(0).then(res => cb(null, res), cb) : step(0)
}

const whichSync = (cmd, opt) => {
  opt = opt || {}

  const {pathEnv, pathExt, pathExtExe} = getPathInfo(cmd, opt)
  const found = []

  for (let i = 0; i < pathEnv.length; i++) {
    const ppRaw = pathEnv[i]
    const pathPart = /^".*"$/.test(ppRaw)
      ? ppRaw.slice(1, -1)
      : ppRaw

    const pCmd = path$3.join(pathPart, cmd)
    const p =
      !pathPart && /^\.[\\\/]/.test(cmd)
        ? cmd.slice(0, 2) + pCmd
        : pCmd

    for (let j = 0; j < pathExt.length; j++) {
      const cur = p + pathExt[j]
      try {
        const is = isexe.sync(cur, {pathExt: pathExtExe})
        if (is) {
          if (opt.all) found.push(cur)
          else return cur
        }
      } catch (ex) {}
    }
  }

  if (opt.all && found.length) return found

  if (opt.nothrow) return null

  throw getNotFoundError(cmd)
}

var which_1 = which$1
which$1.sync = whichSync

var pathKey$1 = {exports: {}}

const pathKey = (options = {}) => {
  const environment = options.env || process.env
  const platform = options.platform || process.platform

  if (platform !== 'win32') {
    return 'PATH'
  }

  return (
    Object.keys(environment)
      .reverse()
      .find(key => key.toUpperCase() === 'PATH') || 'Path'
  )
}

pathKey$1.exports = pathKey
// TODO: Remove this for the next major release
pathKey$1.exports.default = pathKey

const path$2 = require$$0__default$1['default']
const which = which_1
const getPathKey = pathKey$1.exports

function resolveCommandAttempt(parsed, withoutPathExt) {
  const env = parsed.options.env || process.env
  const cwd = process.cwd()
  const hasCustomCwd = parsed.options.cwd != null
  // Worker threads do not have process.chdir()
  const shouldSwitchCwd =
    hasCustomCwd &&
    process.chdir !== undefined &&
    !process.chdir.disabled

  // If a custom `cwd` was specified, we need to change the process cwd
  // because `which` will do stat calls but does not support a custom cwd
  if (shouldSwitchCwd) {
    try {
      process.chdir(parsed.options.cwd)
    } catch (err) {
      /* Empty */
    }
  }

  let resolved

  try {
    resolved = which.sync(parsed.command, {
      path: env[getPathKey({env})],
      pathExt: withoutPathExt ? path$2.delimiter : undefined,
    })
  } catch (e) {
    /* Empty */
  } finally {
    if (shouldSwitchCwd) {
      process.chdir(cwd)
    }
  }

  // If we successfully resolved, ensure that an absolute path is returned
  // Note that when a custom `cwd` was used, we need to resolve to an absolute path based on it
  if (resolved) {
    resolved = path$2.resolve(
      hasCustomCwd ? parsed.options.cwd : '',
      resolved,
    )
  }

  return resolved
}

function resolveCommand$1(parsed) {
  return (
    resolveCommandAttempt(parsed) ||
    resolveCommandAttempt(parsed, true)
  )
}

var resolveCommand_1 = resolveCommand$1

var _escape = {}

// See http://www.robvanderwoude.com/escapechars.php
const metaCharsRegExp = /([()\][%!^"`<>&|;, *?])/g

function escapeCommand(arg) {
  // Escape meta chars
  arg = arg.replace(metaCharsRegExp, '^$1')

  return arg
}

function escapeArgument(arg, doubleEscapeMetaChars) {
  // Convert to string
  arg = `${arg}`

  // Algorithm below is based on https://qntm.org/cmd

  // Sequence of backslashes followed by a double quote:
  // double up all the backslashes and escape the double quote
  arg = arg.replace(/(\\*)"/g, '$1$1\\"')

  // Sequence of backslashes followed by the end of the string
  // (which will become a double quote later):
  // double up all the backslashes
  arg = arg.replace(/(\\*)$/, '$1$1')

  // All other backslashes occur literally

  // Quote the whole thing:
  arg = `"${arg}"`

  // Escape meta chars
  arg = arg.replace(metaCharsRegExp, '^$1')

  // Double escape meta chars if necessary
  if (doubleEscapeMetaChars) {
    arg = arg.replace(metaCharsRegExp, '^$1')
  }

  return arg
}

_escape.command = escapeCommand
_escape.argument = escapeArgument

var shebangRegex$1 = /^#!(.*)/

const shebangRegex = shebangRegex$1

var shebangCommand$1 = (string = '') => {
  const match = string.match(shebangRegex)

  if (!match) {
    return null
  }

  const [path, argument] = match[0]
    .replace(/#! ?/, '')
    .split(' ')
  const binary = path.split('/').pop()

  if (binary === 'env') {
    return argument
  }

  return argument ? `${binary} ${argument}` : binary
}

const fs = require$$0__default['default']
const shebangCommand = shebangCommand$1

function readShebang$1(command) {
  // Read the first 150 bytes from the file
  const size = 150
  const buffer = Buffer.alloc(size)

  let fd

  try {
    fd = fs.openSync(command, 'r')
    fs.readSync(fd, buffer, 0, size, 0)
    fs.closeSync(fd)
  } catch (e) {
    /* Empty */
  }

  // Attempt to extract shebang (null is returned if not a shebang)
  return shebangCommand(buffer.toString())
}

var readShebang_1 = readShebang$1

const path$1 = require$$0__default$1['default']
const resolveCommand = resolveCommand_1
const escape = _escape
const readShebang = readShebang_1

const isWin$2 = process.platform === 'win32'
const isExecutableRegExp = /\.(?:com|exe)$/i
const isCmdShimRegExp =
  /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i

function detectShebang(parsed) {
  parsed.file = resolveCommand(parsed)

  const shebang = parsed.file && readShebang(parsed.file)

  if (shebang) {
    parsed.args.unshift(parsed.file)
    parsed.command = shebang

    return resolveCommand(parsed)
  }

  return parsed.file
}

function parseNonShell(parsed) {
  if (!isWin$2) {
    return parsed
  }

  // Detect & add support for shebangs
  const commandFile = detectShebang(parsed)

  // We don't need a shell if the command filename is an executable
  const needsShell = !isExecutableRegExp.test(commandFile)

  // If a shell is required, use cmd.exe and take care of escaping everything correctly
  // Note that `forceShell` is an hidden option used only in tests
  if (parsed.options.forceShell || needsShell) {
    // Need to double escape meta chars if the command is a cmd-shim located in `node_modules/.bin/`
    // The cmd-shim simply calls execute the package bin file with NodeJS, proxying any argument
    // Because the escape of metachars with ^ gets interpreted when the cmd.exe is first called,
    // we need to double escape them
    const needsDoubleEscapeMetaChars =
      isCmdShimRegExp.test(commandFile)

    // Normalize posix paths into OS compatible paths (e.g.: foo/bar -> foo\bar)
    // This is necessary otherwise it will always fail with ENOENT in those cases
    parsed.command = path$1.normalize(parsed.command)

    // Escape command & arguments
    parsed.command = escape.command(parsed.command)
    parsed.args = parsed.args.map(arg =>
      escape.argument(arg, needsDoubleEscapeMetaChars),
    )

    const shellCommand = [parsed.command]
      .concat(parsed.args)
      .join(' ')

    parsed.args = ['/d', '/s', '/c', `"${shellCommand}"`]
    parsed.command = process.env.comspec || 'cmd.exe'
    parsed.options.windowsVerbatimArguments = true // Tell node's spawn that the arguments are already escaped
  }

  return parsed
}

function parse$1(command, args, options) {
  // Normalize arguments, similar to nodejs
  if (args && !Array.isArray(args)) {
    options = args
    args = null
  }

  args = args ? args.slice(0) : [] // Clone array to avoid changing the original
  options = Object.assign({}, options) // Clone object to avoid changing the original

  // Build our parsed object
  const parsed = {
    command,
    args,
    options,
    file: undefined,
    original: {
      command,
      args,
    },
  }

  // Delegate further parsing to shell or non-shell
  return options.shell ? parsed : parseNonShell(parsed)
}

var parse_1 = parse$1

const isWin$1 = process.platform === 'win32'

function notFoundError(original, syscall) {
  return Object.assign(
    new Error(`${syscall} ${original.command} ENOENT`),
    {
      code: 'ENOENT',
      errno: 'ENOENT',
      syscall: `${syscall} ${original.command}`,
      path: original.command,
      spawnargs: original.args,
    },
  )
}

function hookChildProcess(cp, parsed) {
  if (!isWin$1) {
    return
  }

  const originalEmit = cp.emit

  cp.emit = function (name, arg1) {
    // If emitting "exit" event and exit code is 1, we need to check if
    // the command exists and emit an "error" instead
    // See https://github.com/IndigoUnited/node-cross-spawn/issues/16
    if (name === 'exit') {
      const err = verifyENOENT(arg1, parsed)

      if (err) {
        return originalEmit.call(cp, 'error', err)
      }
    }

    return originalEmit.apply(cp, arguments) // eslint-disable-line prefer-rest-params
  }
}

function verifyENOENT(status, parsed) {
  if (isWin$1 && status === 1 && !parsed.file) {
    return notFoundError(parsed.original, 'spawn')
  }

  return null
}

function verifyENOENTSync(status, parsed) {
  if (isWin$1 && status === 1 && !parsed.file) {
    return notFoundError(parsed.original, 'spawnSync')
  }

  return null
}

var enoent$1 = {
  hookChildProcess,
  verifyENOENT,
  verifyENOENTSync,
  notFoundError,
}

const cp = require$$0__default$2['default']
const parse = parse_1
const enoent = enoent$1

function spawn(command, args, options) {
  // Parse the arguments
  const parsed = parse(command, args, options)

  // Spawn the child process
  const spawned = cp.spawn(
    parsed.command,
    parsed.args,
    parsed.options,
  )

  // Hook into child process "exit" event to emit an error if the command
  // does not exists, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
  enoent.hookChildProcess(spawned, parsed)

  return spawned
}

function spawnSync(command, args, options) {
  // Parse the arguments
  const parsed = parse(command, args, options)

  // Spawn the child process
  const result = cp.spawnSync(
    parsed.command,
    parsed.args,
    parsed.options,
  )

  // Analyze if the command does not exist, see: https://github.com/IndigoUnited/node-cross-spawn/issues/16
  result.error =
    result.error ||
    enoent.verifyENOENTSync(result.status, parsed)

  return result
}

crossSpawn$1.exports = spawn
crossSpawn$1.exports.spawn = spawn
crossSpawn$1.exports.sync = spawnSync

crossSpawn$1.exports._parse = parse
crossSpawn$1.exports._enoent = enoent

var stripFinalNewline$1 = input => {
  const LF = typeof input === 'string' ? '\n' : '\n'.charCodeAt()
  const CR = typeof input === 'string' ? '\r' : '\r'.charCodeAt()

  if (input[input.length - 1] === LF) {
    input = input.slice(0, input.length - 1)
  }

  if (input[input.length - 1] === CR) {
    input = input.slice(0, input.length - 1)
  }

  return input
}

var npmRunPath$1 = {exports: {}}

;(function (module) {
  const path = require$$0__default$1['default']
  const pathKey = pathKey$1.exports

  const npmRunPath = options => {
    options = {
      cwd: process.cwd(),
      path: process.env[pathKey()],
      execPath: process.execPath,
      ...options,
    }

    let previous
    let cwdPath = path.resolve(options.cwd)
    const result = []

    while (previous !== cwdPath) {
      result.push(path.join(cwdPath, 'node_modules/.bin'))
      previous = cwdPath
      cwdPath = path.resolve(cwdPath, '..')
    }

    // Ensure the running `node` binary is used
    const execPathDir = path.resolve(
      options.cwd,
      options.execPath,
      '..',
    )
    result.push(execPathDir)

    return result.concat(options.path).join(path.delimiter)
  }

  module.exports = npmRunPath
  // TODO: Remove this for the next major release
  module.exports.default = npmRunPath

  module.exports.env = options => {
    options = {
      env: process.env,
      ...options,
    }

    const env = {...options.env}
    const path = pathKey({env})

    options.path = env[path]
    env[path] = module.exports(options)

    return env
  }
})(npmRunPath$1)

var onetime$2 = {exports: {}}

var mimicFn$2 = {exports: {}}

const mimicFn$1 = (to, from) => {
  for (const prop of Reflect.ownKeys(from)) {
    Object.defineProperty(
      to,
      prop,
      Object.getOwnPropertyDescriptor(from, prop),
    )
  }

  return to
}

mimicFn$2.exports = mimicFn$1
// TODO: Remove this for the next major release
mimicFn$2.exports.default = mimicFn$1

const mimicFn = mimicFn$2.exports

const calledFunctions = new WeakMap()

const onetime$1 = (function_, options = {}) => {
  if (typeof function_ !== 'function') {
    throw new TypeError('Expected a function')
  }

  let returnValue
  let callCount = 0
  const functionName =
    function_.displayName || function_.name || '<anonymous>'

  const onetime = function (...arguments_) {
    calledFunctions.set(onetime, ++callCount)

    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_)
      function_ = null
    } else if (options.throw === true) {
      throw new Error(
        `Function \`${functionName}\` can only be called once`,
      )
    }

    return returnValue
  }

  mimicFn(onetime, function_)
  calledFunctions.set(onetime, callCount)

  return onetime
}

onetime$2.exports = onetime$1
// TODO: Remove this for the next major release
onetime$2.exports.default = onetime$1

onetime$2.exports.callCount = function_ => {
  if (!calledFunctions.has(function_)) {
    throw new Error(
      `The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`,
    )
  }

  return calledFunctions.get(function_)
}

var main = {}

var signals$2 = {}

var core = {}

Object.defineProperty(core, '__esModule', {value: true})
core.SIGNALS = void 0

const SIGNALS = [
  {
    name: 'SIGHUP',
    number: 1,
    action: 'terminate',
    description: 'Terminal closed',
    standard: 'posix',
  },

  {
    name: 'SIGINT',
    number: 2,
    action: 'terminate',
    description: 'User interruption with CTRL-C',
    standard: 'ansi',
  },

  {
    name: 'SIGQUIT',
    number: 3,
    action: 'core',
    description: 'User interruption with CTRL-\\',
    standard: 'posix',
  },

  {
    name: 'SIGILL',
    number: 4,
    action: 'core',
    description: 'Invalid machine instruction',
    standard: 'ansi',
  },

  {
    name: 'SIGTRAP',
    number: 5,
    action: 'core',
    description: 'Debugger breakpoint',
    standard: 'posix',
  },

  {
    name: 'SIGABRT',
    number: 6,
    action: 'core',
    description: 'Aborted',
    standard: 'ansi',
  },

  {
    name: 'SIGIOT',
    number: 6,
    action: 'core',
    description: 'Aborted',
    standard: 'bsd',
  },

  {
    name: 'SIGBUS',
    number: 7,
    action: 'core',
    description:
      'Bus error due to misaligned, non-existing address or paging error',
    standard: 'bsd',
  },

  {
    name: 'SIGEMT',
    number: 7,
    action: 'terminate',
    description:
      'Command should be emulated but is not implemented',
    standard: 'other',
  },

  {
    name: 'SIGFPE',
    number: 8,
    action: 'core',
    description: 'Floating point arithmetic error',
    standard: 'ansi',
  },

  {
    name: 'SIGKILL',
    number: 9,
    action: 'terminate',
    description: 'Forced termination',
    standard: 'posix',
    forced: true,
  },

  {
    name: 'SIGUSR1',
    number: 10,
    action: 'terminate',
    description: 'Application-specific signal',
    standard: 'posix',
  },

  {
    name: 'SIGSEGV',
    number: 11,
    action: 'core',
    description: 'Segmentation fault',
    standard: 'ansi',
  },

  {
    name: 'SIGUSR2',
    number: 12,
    action: 'terminate',
    description: 'Application-specific signal',
    standard: 'posix',
  },

  {
    name: 'SIGPIPE',
    number: 13,
    action: 'terminate',
    description: 'Broken pipe or socket',
    standard: 'posix',
  },

  {
    name: 'SIGALRM',
    number: 14,
    action: 'terminate',
    description: 'Timeout or timer',
    standard: 'posix',
  },

  {
    name: 'SIGTERM',
    number: 15,
    action: 'terminate',
    description: 'Termination',
    standard: 'ansi',
  },

  {
    name: 'SIGSTKFLT',
    number: 16,
    action: 'terminate',
    description: 'Stack is empty or overflowed',
    standard: 'other',
  },

  {
    name: 'SIGCHLD',
    number: 17,
    action: 'ignore',
    description: 'Child process terminated, paused or unpaused',
    standard: 'posix',
  },

  {
    name: 'SIGCLD',
    number: 17,
    action: 'ignore',
    description: 'Child process terminated, paused or unpaused',
    standard: 'other',
  },

  {
    name: 'SIGCONT',
    number: 18,
    action: 'unpause',
    description: 'Unpaused',
    standard: 'posix',
    forced: true,
  },

  {
    name: 'SIGSTOP',
    number: 19,
    action: 'pause',
    description: 'Paused',
    standard: 'posix',
    forced: true,
  },

  {
    name: 'SIGTSTP',
    number: 20,
    action: 'pause',
    description: 'Paused using CTRL-Z or "suspend"',
    standard: 'posix',
  },

  {
    name: 'SIGTTIN',
    number: 21,
    action: 'pause',
    description: 'Background process cannot read terminal input',
    standard: 'posix',
  },

  {
    name: 'SIGBREAK',
    number: 21,
    action: 'terminate',
    description: 'User interruption with CTRL-BREAK',
    standard: 'other',
  },

  {
    name: 'SIGTTOU',
    number: 22,
    action: 'pause',
    description:
      'Background process cannot write to terminal output',
    standard: 'posix',
  },

  {
    name: 'SIGURG',
    number: 23,
    action: 'ignore',
    description: 'Socket received out-of-band data',
    standard: 'bsd',
  },

  {
    name: 'SIGXCPU',
    number: 24,
    action: 'core',
    description: 'Process timed out',
    standard: 'bsd',
  },

  {
    name: 'SIGXFSZ',
    number: 25,
    action: 'core',
    description: 'File too big',
    standard: 'bsd',
  },

  {
    name: 'SIGVTALRM',
    number: 26,
    action: 'terminate',
    description: 'Timeout or timer',
    standard: 'bsd',
  },

  {
    name: 'SIGPROF',
    number: 27,
    action: 'terminate',
    description: 'Timeout or timer',
    standard: 'bsd',
  },

  {
    name: 'SIGWINCH',
    number: 28,
    action: 'ignore',
    description: 'Terminal window size changed',
    standard: 'bsd',
  },

  {
    name: 'SIGIO',
    number: 29,
    action: 'terminate',
    description: 'I/O is available',
    standard: 'other',
  },

  {
    name: 'SIGPOLL',
    number: 29,
    action: 'terminate',
    description: 'Watched event',
    standard: 'other',
  },

  {
    name: 'SIGINFO',
    number: 29,
    action: 'ignore',
    description: 'Request for process information',
    standard: 'other',
  },

  {
    name: 'SIGPWR',
    number: 30,
    action: 'terminate',
    description: 'Device running out of power',
    standard: 'systemv',
  },

  {
    name: 'SIGSYS',
    number: 31,
    action: 'core',
    description: 'Invalid system call',
    standard: 'other',
  },

  {
    name: 'SIGUNUSED',
    number: 31,
    action: 'terminate',
    description: 'Invalid system call',
    standard: 'other',
  },
]
core.SIGNALS = SIGNALS

var realtime = {}

Object.defineProperty(realtime, '__esModule', {value: true})
realtime.SIGRTMAX = realtime.getRealtimeSignals = void 0
const getRealtimeSignals = function () {
  const length = SIGRTMAX - SIGRTMIN + 1
  return Array.from({length}, getRealtimeSignal)
}
realtime.getRealtimeSignals = getRealtimeSignals

const getRealtimeSignal = function (value, index) {
  return {
    name: `SIGRT${index + 1}`,
    number: SIGRTMIN + index,
    action: 'terminate',
    description: 'Application-specific signal (realtime)',
    standard: 'posix',
  }
}

const SIGRTMIN = 34
const SIGRTMAX = 64
realtime.SIGRTMAX = SIGRTMAX

Object.defineProperty(signals$2, '__esModule', {value: true})
signals$2.getSignals = void 0
var _os$1 = require$$0__default$3['default']

var _core = core
var _realtime$1 = realtime

const getSignals = function () {
  const realtimeSignals = (0, _realtime$1.getRealtimeSignals)()
  const signals = [..._core.SIGNALS, ...realtimeSignals].map(
    normalizeSignal,
  )
  return signals
}
signals$2.getSignals = getSignals

const normalizeSignal = function ({
  name,
  number: defaultNumber,
  description,
  action,
  forced = false,
  standard,
}) {
  const {
    signals: {[name]: constantSignal},
  } = _os$1.constants
  const supported = constantSignal !== undefined
  const number = supported ? constantSignal : defaultNumber
  return {
    name,
    number,
    description,
    supported,
    action,
    forced,
    standard,
  }
}

Object.defineProperty(main, '__esModule', {value: true})
main.signalsByNumber = main.signalsByName = void 0
var _os = require$$0__default$3['default']

var _signals = signals$2
var _realtime = realtime

const getSignalsByName = function () {
  const signals = (0, _signals.getSignals)()
  return signals.reduce(getSignalByName, {})
}

const getSignalByName = function (
  signalByNameMemo,
  {
    name,
    number,
    description,
    supported,
    action,
    forced,
    standard,
  },
) {
  return {
    ...signalByNameMemo,
    [name]: {
      name,
      number,
      description,
      supported,
      action,
      forced,
      standard,
    },
  }
}

const signalsByName$1 = getSignalsByName()
main.signalsByName = signalsByName$1

const getSignalsByNumber = function () {
  const signals = (0, _signals.getSignals)()
  const length = _realtime.SIGRTMAX + 1
  const signalsA = Array.from({length}, (value, number) =>
    getSignalByNumber(number, signals),
  )

  return Object.assign({}, ...signalsA)
}

const getSignalByNumber = function (number, signals) {
  const signal = findSignalByNumber(number, signals)

  if (signal === undefined) {
    return {}
  }

  const {
    name,
    description,
    supported,
    action,
    forced,
    standard,
  } = signal
  return {
    [number]: {
      name,
      number,
      description,
      supported,
      action,
      forced,
      standard,
    },
  }
}

const findSignalByNumber = function (number, signals) {
  const signal = signals.find(
    ({name}) => _os.constants.signals[name] === number,
  )

  if (signal !== undefined) {
    return signal
  }

  return signals.find(signalA => signalA.number === number)
}

const signalsByNumber = getSignalsByNumber()
main.signalsByNumber = signalsByNumber

const {signalsByName} = main

const getErrorPrefix = ({
  timedOut,
  timeout,
  errorCode,
  signal,
  signalDescription,
  exitCode,
  isCanceled,
}) => {
  if (timedOut) {
    return `timed out after ${timeout} milliseconds`
  }

  if (isCanceled) {
    return 'was canceled'
  }

  if (errorCode !== undefined) {
    return `failed with ${errorCode}`
  }

  if (signal !== undefined) {
    return `was killed with ${signal} (${signalDescription})`
  }

  if (exitCode !== undefined) {
    return `failed with exit code ${exitCode}`
  }

  return 'failed'
}

const makeError$1 = ({
  stdout,
  stderr,
  all,
  error,
  signal,
  exitCode,
  command,
  escapedCommand,
  timedOut,
  isCanceled,
  killed,
  parsed: {
    options: {timeout},
  },
}) => {
  // `signal` and `exitCode` emitted on `spawned.on('exit')` event can be `null`.
  // We normalize them to `undefined`
  exitCode = exitCode === null ? undefined : exitCode
  signal = signal === null ? undefined : signal
  const signalDescription =
    signal === undefined
      ? undefined
      : signalsByName[signal].description

  const errorCode = error && error.code

  const prefix = getErrorPrefix({
    timedOut,
    timeout,
    errorCode,
    signal,
    signalDescription,
    exitCode,
    isCanceled,
  })
  const execaMessage = `Command ${prefix}: ${command}`
  const isError =
    Object.prototype.toString.call(error) === '[object Error]'
  const shortMessage = isError
    ? `${execaMessage}\n${error.message}`
    : execaMessage
  const message = [shortMessage, stderr, stdout]
    .filter(Boolean)
    .join('\n')

  if (isError) {
    error.originalMessage = error.message
    error.message = message
  } else {
    error = new Error(message)
  }

  error.shortMessage = shortMessage
  error.command = command
  error.escapedCommand = escapedCommand
  error.exitCode = exitCode
  error.signal = signal
  error.signalDescription = signalDescription
  error.stdout = stdout
  error.stderr = stderr

  if (all !== undefined) {
    error.all = all
  }

  if ('bufferedData' in error) {
    delete error.bufferedData
  }

  error.failed = true
  error.timedOut = Boolean(timedOut)
  error.isCanceled = isCanceled
  error.killed = killed && !timedOut

  return error
}

var error = makeError$1

var stdio = {exports: {}}

const aliases = ['stdin', 'stdout', 'stderr']

const hasAlias = options =>
  aliases.some(alias => options[alias] !== undefined)

const normalizeStdio$1 = options => {
  if (!options) {
    return
  }

  const {stdio} = options

  if (stdio === undefined) {
    return aliases.map(alias => options[alias])
  }

  if (hasAlias(options)) {
    throw new Error(
      `It's not possible to provide \`stdio\` in combination with one of ${aliases
        .map(alias => `\`${alias}\``)
        .join(', ')}`,
    )
  }

  if (typeof stdio === 'string') {
    return stdio
  }

  if (!Array.isArray(stdio)) {
    throw new TypeError(
      `Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof stdio}\``,
    )
  }

  const length = Math.max(stdio.length, aliases.length)
  return Array.from({length}, (value, index) => stdio[index])
}

stdio.exports = normalizeStdio$1

// `ipc` is pushed unless it is already present
stdio.exports.node = options => {
  const stdio = normalizeStdio$1(options)

  if (stdio === 'ipc') {
    return 'ipc'
  }

  if (stdio === undefined || typeof stdio === 'string') {
    return [stdio, stdio, stdio, 'ipc']
  }

  if (stdio.includes('ipc')) {
    return stdio
  }

  return [...stdio, 'ipc']
}

var signalExit = {exports: {}}

var signals$1 = {exports: {}}

;(function (module) {
  // This is not the set of all possible signals.
  //
  // It IS, however, the set of all signals that trigger
  // an exit on either Linux or BSD systems.  Linux is a
  // superset of the signal names supported on BSD, and
  // the unknown signals just fail to register, so we can
  // catch that easily enough.
  //
  // Don't bother with SIGKILL.  It's uncatchable, which
  // means that we can't fire any callbacks anyway.
  //
  // If a user does happen to register a handler on a non-
  // fatal signal like SIGWINCH or something, and then
  // exit, it'll end up firing `process.emit('exit')`, so
  // the handler will be fired anyway.
  //
  // SIGBUS, SIGFPE, SIGSEGV and SIGILL, when not raised
  // artificially, inherently leave the process in a
  // state from which it is not safe to try and enter JS
  // listeners.
  module.exports = [
    'SIGABRT',
    'SIGALRM',
    'SIGHUP',
    'SIGINT',
    'SIGTERM',
  ]

  if (process.platform !== 'win32') {
    module.exports.push(
      'SIGVTALRM',
      'SIGXCPU',
      'SIGXFSZ',
      'SIGUSR2',
      'SIGTRAP',
      'SIGSYS',
      'SIGQUIT',
      'SIGIOT',
      // should detect profiler and enable/disable accordingly.
      // see #21
      // 'SIGPROF'
    )
  }

  if (process.platform === 'linux') {
    module.exports.push(
      'SIGIO',
      'SIGPOLL',
      'SIGPWR',
      'SIGSTKFLT',
      'SIGUNUSED',
    )
  }
})(signals$1)

// Note: since nyc uses this module to output coverage, any lines
// that are in the direct sync flow of nyc's outputCoverage are
// ignored, since we can never get coverage for them.
var assert = require$$0__default$4['default']
var signals = signals$1.exports
var isWin = /^win/i.test(process.platform)

var EE = require$$2__default['default']
/* istanbul ignore if */
if (typeof EE !== 'function') {
  EE = EE.EventEmitter
}

var emitter
if (process.__signal_exit_emitter__) {
  emitter = process.__signal_exit_emitter__
} else {
  emitter = process.__signal_exit_emitter__ = new EE()
  emitter.count = 0
  emitter.emitted = {}
}

// Because this emitter is a global, we have to check to see if a
// previous version of this library failed to enable infinite listeners.
// I know what you're about to say.  But literally everything about
// signal-exit is a compromise with evil.  Get used to it.
if (!emitter.infinite) {
  emitter.setMaxListeners(Infinity)
  emitter.infinite = true
}

signalExit.exports = function (cb, opts) {
  assert.equal(
    typeof cb,
    'function',
    'a callback must be provided for exit handler',
  )

  if (loaded === false) {
    load()
  }

  var ev = 'exit'
  if (opts && opts.alwaysLast) {
    ev = 'afterexit'
  }

  var remove = function () {
    emitter.removeListener(ev, cb)
    if (
      emitter.listeners('exit').length === 0 &&
      emitter.listeners('afterexit').length === 0
    ) {
      unload()
    }
  }
  emitter.on(ev, cb)

  return remove
}

signalExit.exports.unload = unload
function unload() {
  if (!loaded) {
    return
  }
  loaded = false

  signals.forEach(function (sig) {
    try {
      process.removeListener(sig, sigListeners[sig])
    } catch (er) {}
  })
  process.emit = originalProcessEmit
  process.reallyExit = originalProcessReallyExit
  emitter.count -= 1
}

function emit(event, code, signal) {
  if (emitter.emitted[event]) {
    return
  }
  emitter.emitted[event] = true
  emitter.emit(event, code, signal)
}

// { <signal>: <listener fn>, ... }
var sigListeners = {}
signals.forEach(function (sig) {
  sigListeners[sig] = function listener() {
    // If there are no other listeners, an exit is coming!
    // Simplest way: remove us and then re-send the signal.
    // We know that this will kill the process, so we can
    // safely emit now.
    var listeners = process.listeners(sig)
    if (listeners.length === emitter.count) {
      unload()
      emit('exit', null, sig)
      /* istanbul ignore next */
      emit('afterexit', null, sig)
      /* istanbul ignore next */
      if (isWin && sig === 'SIGHUP') {
        // "SIGHUP" throws an `ENOSYS` error on Windows,
        // so use a supported signal instead
        sig = 'SIGINT'
      }
      process.kill(process.pid, sig)
    }
  }
})

signalExit.exports.signals = function () {
  return signals
}

signalExit.exports.load = load

var loaded = false

function load() {
  if (loaded) {
    return
  }
  loaded = true

  // This is the number of onSignalExit's that are in play.
  // It's important so that we can count the correct number of
  // listeners on signals, and don't wait for the other one to
  // handle it instead of us.
  emitter.count += 1

  signals = signals.filter(function (sig) {
    try {
      process.on(sig, sigListeners[sig])
      return true
    } catch (er) {
      return false
    }
  })

  process.emit = processEmit
  process.reallyExit = processReallyExit
}

var originalProcessReallyExit = process.reallyExit
function processReallyExit(code) {
  process.exitCode = code || 0
  emit('exit', process.exitCode, null)
  /* istanbul ignore next */
  emit('afterexit', process.exitCode, null)
  /* istanbul ignore next */
  originalProcessReallyExit.call(process, process.exitCode)
}

var originalProcessEmit = process.emit
function processEmit(ev, arg) {
  if (ev === 'exit') {
    if (arg !== undefined) {
      process.exitCode = arg
    }
    var ret = originalProcessEmit.apply(this, arguments)
    emit('exit', process.exitCode, null)
    /* istanbul ignore next */
    emit('afterexit', process.exitCode, null)
    return ret
  } else {
    return originalProcessEmit.apply(this, arguments)
  }
}

const os$1 = require$$0__default$3['default']
const onExit = signalExit.exports

const DEFAULT_FORCE_KILL_TIMEOUT = 1000 * 5

// Monkey-patches `childProcess.kill()` to add `forceKillAfterTimeout` behavior
const spawnedKill$1 = (
  kill,
  signal = 'SIGTERM',
  options = {},
) => {
  const killResult = kill(signal)
  setKillTimeout(kill, signal, options, killResult)
  return killResult
}

const setKillTimeout = (kill, signal, options, killResult) => {
  if (!shouldForceKill(signal, options, killResult)) {
    return
  }

  const timeout = getForceKillAfterTimeout(options)
  const t = setTimeout(() => {
    kill('SIGKILL')
  }, timeout)

  // Guarded because there's no `.unref()` when `execa` is used in the renderer
  // process in Electron. This cannot be tested since we don't run tests in
  // Electron.
  // istanbul ignore else
  if (t.unref) {
    t.unref()
  }
}

const shouldForceKill = (
  signal,
  {forceKillAfterTimeout},
  killResult,
) => {
  return (
    isSigterm(signal) &&
    forceKillAfterTimeout !== false &&
    killResult
  )
}

const isSigterm = signal => {
  return (
    signal === os$1.constants.signals.SIGTERM ||
    (typeof signal === 'string' &&
      signal.toUpperCase() === 'SIGTERM')
  )
}

const getForceKillAfterTimeout = ({
  forceKillAfterTimeout = true,
}) => {
  if (forceKillAfterTimeout === true) {
    return DEFAULT_FORCE_KILL_TIMEOUT
  }

  if (
    !Number.isFinite(forceKillAfterTimeout) ||
    forceKillAfterTimeout < 0
  ) {
    throw new TypeError(
      `Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${forceKillAfterTimeout}\` (${typeof forceKillAfterTimeout})`,
    )
  }

  return forceKillAfterTimeout
}

// `childProcess.cancel()`
const spawnedCancel$1 = (spawned, context) => {
  const killResult = spawned.kill()

  if (killResult) {
    context.isCanceled = true
  }
}

const timeoutKill = (spawned, signal, reject) => {
  spawned.kill(signal)
  reject(
    Object.assign(new Error('Timed out'), {
      timedOut: true,
      signal,
    }),
  )
}

// `timeout` option handling
const setupTimeout$1 = (
  spawned,
  {timeout, killSignal = 'SIGTERM'},
  spawnedPromise,
) => {
  if (timeout === 0 || timeout === undefined) {
    return spawnedPromise
  }

  let timeoutId
  const timeoutPromise = new Promise((resolve, reject) => {
    timeoutId = setTimeout(() => {
      timeoutKill(spawned, killSignal, reject)
    }, timeout)
  })

  const safeSpawnedPromise = spawnedPromise.finally(() => {
    clearTimeout(timeoutId)
  })

  return Promise.race([timeoutPromise, safeSpawnedPromise])
}

const validateTimeout$1 = ({timeout}) => {
  if (
    timeout !== undefined &&
    (!Number.isFinite(timeout) || timeout < 0)
  ) {
    throw new TypeError(
      `Expected the \`timeout\` option to be a non-negative integer, got \`${timeout}\` (${typeof timeout})`,
    )
  }
}

// `cleanup` option handling
const setExitHandler$1 = async (
  spawned,
  {cleanup, detached},
  timedPromise,
) => {
  if (!cleanup || detached) {
    return timedPromise
  }

  const removeExitHandler = onExit(() => {
    spawned.kill()
  })

  return timedPromise.finally(() => {
    removeExitHandler()
  })
}

var kill = {
  spawnedKill: spawnedKill$1,
  spawnedCancel: spawnedCancel$1,
  setupTimeout: setupTimeout$1,
  validateTimeout: validateTimeout$1,
  setExitHandler: setExitHandler$1,
}

const isStream$1 = stream =>
  stream !== null &&
  typeof stream === 'object' &&
  typeof stream.pipe === 'function'

isStream$1.writable = stream =>
  isStream$1(stream) &&
  stream.writable !== false &&
  typeof stream._write === 'function' &&
  typeof stream._writableState === 'object'

isStream$1.readable = stream =>
  isStream$1(stream) &&
  stream.readable !== false &&
  typeof stream._read === 'function' &&
  typeof stream._readableState === 'object'

isStream$1.duplex = stream =>
  isStream$1.writable(stream) && isStream$1.readable(stream)

isStream$1.transform = stream =>
  isStream$1.duplex(stream) &&
  typeof stream._transform === 'function' &&
  typeof stream._transformState === 'object'

var isStream_1 = isStream$1

var getStream$2 = {exports: {}}

const {PassThrough: PassThroughStream} =
  require$$0__default$5['default']

var bufferStream$1 = options => {
  options = {...options}

  const {array} = options
  let {encoding} = options
  const isBuffer = encoding === 'buffer'
  let objectMode = false

  if (array) {
    objectMode = !(encoding || isBuffer)
  } else {
    encoding = encoding || 'utf8'
  }

  if (isBuffer) {
    encoding = null
  }

  const stream = new PassThroughStream({objectMode})

  if (encoding) {
    stream.setEncoding(encoding)
  }

  let length = 0
  const chunks = []

  stream.on('data', chunk => {
    chunks.push(chunk)

    if (objectMode) {
      length = chunks.length
    } else {
      length += chunk.length
    }
  })

  stream.getBufferedValue = () => {
    if (array) {
      return chunks
    }

    return isBuffer
      ? Buffer.concat(chunks, length)
      : chunks.join('')
  }

  stream.getBufferedLength = () => length

  return stream
}

const {constants: BufferConstants} =
  require$$0__default$6['default']
const stream$1 = require$$0__default$5['default']
const {promisify} = require$$2__default$1['default']
const bufferStream = bufferStream$1

const streamPipelinePromisified = promisify(stream$1.pipeline)

class MaxBufferError extends Error {
  constructor() {
    super('maxBuffer exceeded')
    this.name = 'MaxBufferError'
  }
}

async function getStream$1(inputStream, options) {
  if (!inputStream) {
    throw new Error('Expected a stream')
  }

  options = {
    maxBuffer: Infinity,
    ...options,
  }

  const {maxBuffer} = options
  const stream = bufferStream(options)

  await new Promise((resolve, reject) => {
    const rejectPromise = error => {
      // Don't retrieve an oversized buffer.
      if (
        error &&
        stream.getBufferedLength() <= BufferConstants.MAX_LENGTH
      ) {
        error.bufferedData = stream.getBufferedValue()
      }

      reject(error)
    }

    ;(async () => {
      try {
        await streamPipelinePromisified(inputStream, stream)
        resolve()
      } catch (error) {
        rejectPromise(error)
      }
    })()

    stream.on('data', () => {
      if (stream.getBufferedLength() > maxBuffer) {
        rejectPromise(new MaxBufferError())
      }
    })
  })

  return stream.getBufferedValue()
}

getStream$2.exports = getStream$1
getStream$2.exports.buffer = (stream, options) =>
  getStream$1(stream, {...options, encoding: 'buffer'})
getStream$2.exports.array = (stream, options) =>
  getStream$1(stream, {...options, array: true})
getStream$2.exports.MaxBufferError = MaxBufferError

const {PassThrough} = require$$0__default$5['default']

var mergeStream$1 = function (/*streams...*/) {
  var sources = []
  var output = new PassThrough({objectMode: true})

  output.setMaxListeners(0)

  output.add = add
  output.isEmpty = isEmpty

  output.on('unpipe', remove)

  Array.prototype.slice.call(arguments).forEach(add)

  return output

  function add(source) {
    if (Array.isArray(source)) {
      source.forEach(add)
      return this
    }

    sources.push(source)
    source.once('end', remove.bind(null, source))
    source.once('error', output.emit.bind(output, 'error'))
    source.pipe(output, {end: false})
    return this
  }

  function isEmpty() {
    return sources.length == 0
  }

  function remove(source) {
    sources = sources.filter(function (it) {
      return it !== source
    })
    if (!sources.length && output.readable) {
      output.end()
    }
  }
}

const isStream = isStream_1
const getStream = getStream$2.exports
const mergeStream = mergeStream$1

// `input` option
const handleInput$1 = (spawned, input) => {
  // Checking for stdin is workaround for https://github.com/nodejs/node/issues/26852
  // @todo remove `|| spawned.stdin === undefined` once we drop support for Node.js <=12.2.0
  if (input === undefined || spawned.stdin === undefined) {
    return
  }

  if (isStream(input)) {
    input.pipe(spawned.stdin)
  } else {
    spawned.stdin.end(input)
  }
}

// `all` interleaves `stdout` and `stderr`
const makeAllStream$1 = (spawned, {all}) => {
  if (!all || (!spawned.stdout && !spawned.stderr)) {
    return
  }

  const mixed = mergeStream()

  if (spawned.stdout) {
    mixed.add(spawned.stdout)
  }

  if (spawned.stderr) {
    mixed.add(spawned.stderr)
  }

  return mixed
}

// On failure, `result.stdout|stderr|all` should contain the currently buffered stream
const getBufferedData = async (stream, streamPromise) => {
  if (!stream) {
    return
  }

  stream.destroy()

  try {
    return await streamPromise
  } catch (error) {
    return error.bufferedData
  }
}

const getStreamPromise = (
  stream,
  {encoding, buffer, maxBuffer},
) => {
  if (!stream || !buffer) {
    return
  }

  if (encoding) {
    return getStream(stream, {encoding, maxBuffer})
  }

  return getStream.buffer(stream, {maxBuffer})
}

// Retrieve result of child process: exit code, signal, error, streams (stdout/stderr/all)
const getSpawnedResult$1 = async (
  {stdout, stderr, all},
  {encoding, buffer, maxBuffer},
  processDone,
) => {
  const stdoutPromise = getStreamPromise(stdout, {
    encoding,
    buffer,
    maxBuffer,
  })
  const stderrPromise = getStreamPromise(stderr, {
    encoding,
    buffer,
    maxBuffer,
  })
  const allPromise = getStreamPromise(all, {
    encoding,
    buffer,
    maxBuffer: maxBuffer * 2,
  })

  try {
    return await Promise.all([
      processDone,
      stdoutPromise,
      stderrPromise,
      allPromise,
    ])
  } catch (error) {
    return Promise.all([
      {error, signal: error.signal, timedOut: error.timedOut},
      getBufferedData(stdout, stdoutPromise),
      getBufferedData(stderr, stderrPromise),
      getBufferedData(all, allPromise),
    ])
  }
}

const validateInputSync$1 = ({input}) => {
  if (isStream(input)) {
    throw new TypeError(
      'The `input` option cannot be a stream in sync mode',
    )
  }
}

var stream = {
  handleInput: handleInput$1,
  makeAllStream: makeAllStream$1,
  getSpawnedResult: getSpawnedResult$1,
  validateInputSync: validateInputSync$1,
}

const nativePromisePrototype = (async () => {})().constructor
  .prototype
const descriptors = ['then', 'catch', 'finally'].map(
  property => [
    property,
    Reflect.getOwnPropertyDescriptor(
      nativePromisePrototype,
      property,
    ),
  ],
)

// The return value is a mixin of `childProcess` and `Promise`
const mergePromise$1 = (spawned, promise) => {
  for (const [property, descriptor] of descriptors) {
    // Starting the main `promise` is deferred to avoid consuming streams
    const value =
      typeof promise === 'function'
        ? (...args) =>
            Reflect.apply(descriptor.value, promise(), args)
        : descriptor.value.bind(promise)

    Reflect.defineProperty(spawned, property, {
      ...descriptor,
      value,
    })
  }

  return spawned
}

// Use promises instead of `child_process` events
const getSpawnedPromise$1 = spawned => {
  return new Promise((resolve, reject) => {
    spawned.on('exit', (exitCode, signal) => {
      resolve({exitCode, signal})
    })

    spawned.on('error', error => {
      reject(error)
    })

    if (spawned.stdin) {
      spawned.stdin.on('error', error => {
        reject(error)
      })
    }
  })
}

var promise = {
  mergePromise: mergePromise$1,
  getSpawnedPromise: getSpawnedPromise$1,
}

const normalizeArgs = (file, args = []) => {
  if (!Array.isArray(args)) {
    return [file]
  }

  return [file, ...args]
}

const NO_ESCAPE_REGEXP = /^[\w.-]+$/
const DOUBLE_QUOTES_REGEXP = /"/g

const escapeArg = arg => {
  if (typeof arg !== 'string' || NO_ESCAPE_REGEXP.test(arg)) {
    return arg
  }

  return `"${arg.replace(DOUBLE_QUOTES_REGEXP, '\\"')}"`
}

const joinCommand$1 = (file, args) => {
  return normalizeArgs(file, args).join(' ')
}

const getEscapedCommand$1 = (file, args) => {
  return normalizeArgs(file, args)
    .map(arg => escapeArg(arg))
    .join(' ')
}

const SPACES_REGEXP = / +/g

// Handle `execa.command()`
const parseCommand$1 = command => {
  const tokens = []
  for (const token of command.trim().split(SPACES_REGEXP)) {
    // Allow spaces to be escaped by a backslash if not meant as a delimiter
    const previousToken = tokens[tokens.length - 1]
    if (previousToken && previousToken.endsWith('\\')) {
      // Merge previous token with current one
      tokens[tokens.length - 1] = `${previousToken.slice(
        0,
        -1,
      )} ${token}`
    } else {
      tokens.push(token)
    }
  }

  return tokens
}

var command = {
  joinCommand: joinCommand$1,
  getEscapedCommand: getEscapedCommand$1,
  parseCommand: parseCommand$1,
}

const path = require$$0__default$1['default']
const childProcess = require$$0__default$2['default']
const crossSpawn = crossSpawn$1.exports
const stripFinalNewline = stripFinalNewline$1
const npmRunPath = npmRunPath$1.exports
const onetime = onetime$2.exports
const makeError = error
const normalizeStdio = stdio.exports
const {
  spawnedKill,
  spawnedCancel,
  setupTimeout,
  validateTimeout,
  setExitHandler,
} = kill
const {
  handleInput,
  getSpawnedResult,
  makeAllStream,
  validateInputSync,
} = stream
const {mergePromise, getSpawnedPromise} = promise
const {joinCommand, parseCommand, getEscapedCommand} = command

const DEFAULT_MAX_BUFFER = 1000 * 1000 * 100

const getEnv = ({
  env: envOption,
  extendEnv,
  preferLocal,
  localDir,
  execPath,
}) => {
  const env = extendEnv
    ? {...process.env, ...envOption}
    : envOption

  if (preferLocal) {
    return npmRunPath.env({env, cwd: localDir, execPath})
  }

  return env
}

const handleArguments = (file, args, options = {}) => {
  const parsed = crossSpawn._parse(file, args, options)
  file = parsed.command
  args = parsed.args
  options = parsed.options

  options = {
    maxBuffer: DEFAULT_MAX_BUFFER,
    buffer: true,
    stripFinalNewline: true,
    extendEnv: true,
    preferLocal: false,
    localDir: options.cwd || process.cwd(),
    execPath: process.execPath,
    encoding: 'utf8',
    reject: true,
    cleanup: true,
    all: false,
    windowsHide: true,
    ...options,
  }

  options.env = getEnv(options)

  options.stdio = normalizeStdio(options)

  if (
    process.platform === 'win32' &&
    path.basename(file, '.exe') === 'cmd'
  ) {
    // #116
    args.unshift('/q')
  }

  return {file, args, options, parsed}
}

const handleOutput = (options, value, error) => {
  if (typeof value !== 'string' && !Buffer.isBuffer(value)) {
    // When `execa.sync()` errors, we normalize it to '' to mimic `execa()`
    return error === undefined ? undefined : ''
  }

  if (options.stripFinalNewline) {
    return stripFinalNewline(value)
  }

  return value
}

const execa = (file, args, options) => {
  const parsed = handleArguments(file, args, options)
  const command = joinCommand(file, args)
  const escapedCommand = getEscapedCommand(file, args)

  validateTimeout(parsed.options)

  let spawned
  try {
    spawned = childProcess.spawn(
      parsed.file,
      parsed.args,
      parsed.options,
    )
  } catch (error) {
    // Ensure the returned error is always both a promise and a child process
    const dummySpawned = new childProcess.ChildProcess()
    const errorPromise = Promise.reject(
      makeError({
        error,
        stdout: '',
        stderr: '',
        all: '',
        command,
        escapedCommand,
        parsed,
        timedOut: false,
        isCanceled: false,
        killed: false,
      }),
    )
    return mergePromise(dummySpawned, errorPromise)
  }

  const spawnedPromise = getSpawnedPromise(spawned)
  const timedPromise = setupTimeout(
    spawned,
    parsed.options,
    spawnedPromise,
  )
  const processDone = setExitHandler(
    spawned,
    parsed.options,
    timedPromise,
  )

  const context = {isCanceled: false}

  spawned.kill = spawnedKill.bind(
    null,
    spawned.kill.bind(spawned),
  )
  spawned.cancel = spawnedCancel.bind(null, spawned, context)

  const handlePromise = async () => {
    const [
      {error, exitCode, signal, timedOut},
      stdoutResult,
      stderrResult,
      allResult,
    ] = await getSpawnedResult(
      spawned,
      parsed.options,
      processDone,
    )
    const stdout = handleOutput(parsed.options, stdoutResult)
    const stderr = handleOutput(parsed.options, stderrResult)
    const all = handleOutput(parsed.options, allResult)

    if (error || exitCode !== 0 || signal !== null) {
      const returnedError = makeError({
        error,
        exitCode,
        signal,
        stdout,
        stderr,
        all,
        command,
        escapedCommand,
        parsed,
        timedOut,
        isCanceled: context.isCanceled,
        killed: spawned.killed,
      })

      if (!parsed.options.reject) {
        return returnedError
      }

      throw returnedError
    }

    return {
      command,
      escapedCommand,
      exitCode: 0,
      stdout,
      stderr,
      all,
      failed: false,
      timedOut: false,
      isCanceled: false,
      killed: false,
    }
  }

  const handlePromiseOnce = onetime(handlePromise)

  handleInput(spawned, parsed.options.input)

  spawned.all = makeAllStream(spawned, parsed.options)

  return mergePromise(spawned, handlePromiseOnce)
}

execa$2.exports = execa

execa$2.exports.sync = (file, args, options) => {
  const parsed = handleArguments(file, args, options)
  const command = joinCommand(file, args)
  const escapedCommand = getEscapedCommand(file, args)

  validateInputSync(parsed.options)

  let result
  try {
    result = childProcess.spawnSync(
      parsed.file,
      parsed.args,
      parsed.options,
    )
  } catch (error) {
    throw makeError({
      error,
      stdout: '',
      stderr: '',
      all: '',
      command,
      escapedCommand,
      parsed,
      timedOut: false,
      isCanceled: false,
      killed: false,
    })
  }

  const stdout = handleOutput(
    parsed.options,
    result.stdout,
    result.error,
  )
  const stderr = handleOutput(
    parsed.options,
    result.stderr,
    result.error,
  )

  if (
    result.error ||
    result.status !== 0 ||
    result.signal !== null
  ) {
    const error = makeError({
      stdout,
      stderr,
      error: result.error,
      signal: result.signal,
      exitCode: result.status,
      command,
      escapedCommand,
      parsed,
      timedOut:
        result.error && result.error.code === 'ETIMEDOUT',
      isCanceled: false,
      killed: result.signal !== null,
    })

    if (!parsed.options.reject) {
      return error
    }

    throw error
  }

  return {
    command,
    escapedCommand,
    exitCode: 0,
    stdout,
    stderr,
    failed: false,
    timedOut: false,
    isCanceled: false,
    killed: false,
  }
}

execa$2.exports.command = (command, options) => {
  const [file, ...args] = parseCommand(command)
  return execa(file, args, options)
}

execa$2.exports.commandSync = (command, options) => {
  const [file, ...args] = parseCommand(command)
  return execa.sync(file, args, options)
}

execa$2.exports.node = (scriptPath, args, options = {}) => {
  if (args && !Array.isArray(args) && typeof args === 'object') {
    options = args
    args = []
  }

  const stdio = normalizeStdio.node(options)
  const defaultExecArgv = process.execArgv.filter(
    arg => !arg.startsWith('--inspect'),
  )

  const {
    nodePath = process.execPath,
    nodeOptions = defaultExecArgv,
  } = options

  return execa(
    nodePath,
    [
      ...nodeOptions,
      scriptPath,
      ...(Array.isArray(args) ? args : []),
    ],
    {
      ...options,
      stdin: undefined,
      stdout: undefined,
      stderr: undefined,
      stdio,
      shell: false,
    },
  )
}

var execa$1 = execa$2.exports

var ansiStyles$1 = {exports: {}}

var colorName = {
  aliceblue: [240, 248, 255],
  antiquewhite: [250, 235, 215],
  aqua: [0, 255, 255],
  aquamarine: [127, 255, 212],
  azure: [240, 255, 255],
  beige: [245, 245, 220],
  bisque: [255, 228, 196],
  black: [0, 0, 0],
  blanchedalmond: [255, 235, 205],
  blue: [0, 0, 255],
  blueviolet: [138, 43, 226],
  brown: [165, 42, 42],
  burlywood: [222, 184, 135],
  cadetblue: [95, 158, 160],
  chartreuse: [127, 255, 0],
  chocolate: [210, 105, 30],
  coral: [255, 127, 80],
  cornflowerblue: [100, 149, 237],
  cornsilk: [255, 248, 220],
  crimson: [220, 20, 60],
  cyan: [0, 255, 255],
  darkblue: [0, 0, 139],
  darkcyan: [0, 139, 139],
  darkgoldenrod: [184, 134, 11],
  darkgray: [169, 169, 169],
  darkgreen: [0, 100, 0],
  darkgrey: [169, 169, 169],
  darkkhaki: [189, 183, 107],
  darkmagenta: [139, 0, 139],
  darkolivegreen: [85, 107, 47],
  darkorange: [255, 140, 0],
  darkorchid: [153, 50, 204],
  darkred: [139, 0, 0],
  darksalmon: [233, 150, 122],
  darkseagreen: [143, 188, 143],
  darkslateblue: [72, 61, 139],
  darkslategray: [47, 79, 79],
  darkslategrey: [47, 79, 79],
  darkturquoise: [0, 206, 209],
  darkviolet: [148, 0, 211],
  deeppink: [255, 20, 147],
  deepskyblue: [0, 191, 255],
  dimgray: [105, 105, 105],
  dimgrey: [105, 105, 105],
  dodgerblue: [30, 144, 255],
  firebrick: [178, 34, 34],
  floralwhite: [255, 250, 240],
  forestgreen: [34, 139, 34],
  fuchsia: [255, 0, 255],
  gainsboro: [220, 220, 220],
  ghostwhite: [248, 248, 255],
  gold: [255, 215, 0],
  goldenrod: [218, 165, 32],
  gray: [128, 128, 128],
  green: [0, 128, 0],
  greenyellow: [173, 255, 47],
  grey: [128, 128, 128],
  honeydew: [240, 255, 240],
  hotpink: [255, 105, 180],
  indianred: [205, 92, 92],
  indigo: [75, 0, 130],
  ivory: [255, 255, 240],
  khaki: [240, 230, 140],
  lavender: [230, 230, 250],
  lavenderblush: [255, 240, 245],
  lawngreen: [124, 252, 0],
  lemonchiffon: [255, 250, 205],
  lightblue: [173, 216, 230],
  lightcoral: [240, 128, 128],
  lightcyan: [224, 255, 255],
  lightgoldenrodyellow: [250, 250, 210],
  lightgray: [211, 211, 211],
  lightgreen: [144, 238, 144],
  lightgrey: [211, 211, 211],
  lightpink: [255, 182, 193],
  lightsalmon: [255, 160, 122],
  lightseagreen: [32, 178, 170],
  lightskyblue: [135, 206, 250],
  lightslategray: [119, 136, 153],
  lightslategrey: [119, 136, 153],
  lightsteelblue: [176, 196, 222],
  lightyellow: [255, 255, 224],
  lime: [0, 255, 0],
  limegreen: [50, 205, 50],
  linen: [250, 240, 230],
  magenta: [255, 0, 255],
  maroon: [128, 0, 0],
  mediumaquamarine: [102, 205, 170],
  mediumblue: [0, 0, 205],
  mediumorchid: [186, 85, 211],
  mediumpurple: [147, 112, 219],
  mediumseagreen: [60, 179, 113],
  mediumslateblue: [123, 104, 238],
  mediumspringgreen: [0, 250, 154],
  mediumturquoise: [72, 209, 204],
  mediumvioletred: [199, 21, 133],
  midnightblue: [25, 25, 112],
  mintcream: [245, 255, 250],
  mistyrose: [255, 228, 225],
  moccasin: [255, 228, 181],
  navajowhite: [255, 222, 173],
  navy: [0, 0, 128],
  oldlace: [253, 245, 230],
  olive: [128, 128, 0],
  olivedrab: [107, 142, 35],
  orange: [255, 165, 0],
  orangered: [255, 69, 0],
  orchid: [218, 112, 214],
  palegoldenrod: [238, 232, 170],
  palegreen: [152, 251, 152],
  paleturquoise: [175, 238, 238],
  palevioletred: [219, 112, 147],
  papayawhip: [255, 239, 213],
  peachpuff: [255, 218, 185],
  peru: [205, 133, 63],
  pink: [255, 192, 203],
  plum: [221, 160, 221],
  powderblue: [176, 224, 230],
  purple: [128, 0, 128],
  rebeccapurple: [102, 51, 153],
  red: [255, 0, 0],
  rosybrown: [188, 143, 143],
  royalblue: [65, 105, 225],
  saddlebrown: [139, 69, 19],
  salmon: [250, 128, 114],
  sandybrown: [244, 164, 96],
  seagreen: [46, 139, 87],
  seashell: [255, 245, 238],
  sienna: [160, 82, 45],
  silver: [192, 192, 192],
  skyblue: [135, 206, 235],
  slateblue: [106, 90, 205],
  slategray: [112, 128, 144],
  slategrey: [112, 128, 144],
  snow: [255, 250, 250],
  springgreen: [0, 255, 127],
  steelblue: [70, 130, 180],
  tan: [210, 180, 140],
  teal: [0, 128, 128],
  thistle: [216, 191, 216],
  tomato: [255, 99, 71],
  turquoise: [64, 224, 208],
  violet: [238, 130, 238],
  wheat: [245, 222, 179],
  white: [255, 255, 255],
  whitesmoke: [245, 245, 245],
  yellow: [255, 255, 0],
  yellowgreen: [154, 205, 50],
}

/* MIT license */

/* eslint-disable no-mixed-operators */
const cssKeywords = colorName

// NOTE: conversions should only return primitive values (i.e. arrays, or
//       values that give correct `typeof` results).
//       do not use box values types (i.e. Number(), String(), etc.)

const reverseKeywords = {}
for (const key of Object.keys(cssKeywords)) {
  reverseKeywords[cssKeywords[key]] = key
}

const convert$1 = {
  rgb: {channels: 3, labels: 'rgb'},
  hsl: {channels: 3, labels: 'hsl'},
  hsv: {channels: 3, labels: 'hsv'},
  hwb: {channels: 3, labels: 'hwb'},
  cmyk: {channels: 4, labels: 'cmyk'},
  xyz: {channels: 3, labels: 'xyz'},
  lab: {channels: 3, labels: 'lab'},
  lch: {channels: 3, labels: 'lch'},
  hex: {channels: 1, labels: ['hex']},
  keyword: {channels: 1, labels: ['keyword']},
  ansi16: {channels: 1, labels: ['ansi16']},
  ansi256: {channels: 1, labels: ['ansi256']},
  hcg: {channels: 3, labels: ['h', 'c', 'g']},
  apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
  gray: {channels: 1, labels: ['gray']},
}

var conversions$2 = convert$1

// Hide .channels and .labels properties
for (const model of Object.keys(convert$1)) {
  if (!('channels' in convert$1[model])) {
    throw new Error('missing channels property: ' + model)
  }

  if (!('labels' in convert$1[model])) {
    throw new Error('missing channel labels property: ' + model)
  }

  if (
    convert$1[model].labels.length !== convert$1[model].channels
  ) {
    throw new Error(
      'channel and label counts mismatch: ' + model,
    )
  }

  const {channels, labels} = convert$1[model]
  delete convert$1[model].channels
  delete convert$1[model].labels
  Object.defineProperty(convert$1[model], 'channels', {
    value: channels,
  })
  Object.defineProperty(convert$1[model], 'labels', {
    value: labels,
  })
}

convert$1.rgb.hsl = function (rgb) {
  const r = rgb[0] / 255
  const g = rgb[1] / 255
  const b = rgb[2] / 255
  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)
  const delta = max - min
  let h
  let s

  if (max === min) {
    h = 0
  } else if (r === max) {
    h = (g - b) / delta
  } else if (g === max) {
    h = 2 + (b - r) / delta
  } else if (b === max) {
    h = 4 + (r - g) / delta
  }

  h = Math.min(h * 60, 360)

  if (h < 0) {
    h += 360
  }

  const l = (min + max) / 2

  if (max === min) {
    s = 0
  } else if (l <= 0.5) {
    s = delta / (max + min)
  } else {
    s = delta / (2 - max - min)
  }

  return [h, s * 100, l * 100]
}

convert$1.rgb.hsv = function (rgb) {
  let rdif
  let gdif
  let bdif
  let h
  let s

  const r = rgb[0] / 255
  const g = rgb[1] / 255
  const b = rgb[2] / 255
  const v = Math.max(r, g, b)
  const diff = v - Math.min(r, g, b)
  const diffc = function (c) {
    return (v - c) / 6 / diff + 1 / 2
  }

  if (diff === 0) {
    h = 0
    s = 0
  } else {
    s = diff / v
    rdif = diffc(r)
    gdif = diffc(g)
    bdif = diffc(b)

    if (r === v) {
      h = bdif - gdif
    } else if (g === v) {
      h = 1 / 3 + rdif - bdif
    } else if (b === v) {
      h = 2 / 3 + gdif - rdif
    }

    if (h < 0) {
      h += 1
    } else if (h > 1) {
      h -= 1
    }
  }

  return [h * 360, s * 100, v * 100]
}

convert$1.rgb.hwb = function (rgb) {
  const r = rgb[0]
  const g = rgb[1]
  let b = rgb[2]
  const h = convert$1.rgb.hsl(rgb)[0]
  const w = (1 / 255) * Math.min(r, Math.min(g, b))

  b = 1 - (1 / 255) * Math.max(r, Math.max(g, b))

  return [h, w * 100, b * 100]
}

convert$1.rgb.cmyk = function (rgb) {
  const r = rgb[0] / 255
  const g = rgb[1] / 255
  const b = rgb[2] / 255

  const k = Math.min(1 - r, 1 - g, 1 - b)
  const c = (1 - r - k) / (1 - k) || 0
  const m = (1 - g - k) / (1 - k) || 0
  const y = (1 - b - k) / (1 - k) || 0

  return [c * 100, m * 100, y * 100, k * 100]
}

function comparativeDistance(x, y) {
  /*
		See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
	*/
  return (
    (x[0] - y[0]) ** 2 + (x[1] - y[1]) ** 2 + (x[2] - y[2]) ** 2
  )
}

convert$1.rgb.keyword = function (rgb) {
  const reversed = reverseKeywords[rgb]
  if (reversed) {
    return reversed
  }

  let currentClosestDistance = Infinity
  let currentClosestKeyword

  for (const keyword of Object.keys(cssKeywords)) {
    const value = cssKeywords[keyword]

    // Compute comparative distance
    const distance = comparativeDistance(rgb, value)

    // Check if its less, if so set as closest
    if (distance < currentClosestDistance) {
      currentClosestDistance = distance
      currentClosestKeyword = keyword
    }
  }

  return currentClosestKeyword
}

convert$1.keyword.rgb = function (keyword) {
  return cssKeywords[keyword]
}

convert$1.rgb.xyz = function (rgb) {
  let r = rgb[0] / 255
  let g = rgb[1] / 255
  let b = rgb[2] / 255

  // Assume sRGB
  r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92
  g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92
  b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92

  const x = r * 0.4124 + g * 0.3576 + b * 0.1805
  const y = r * 0.2126 + g * 0.7152 + b * 0.0722
  const z = r * 0.0193 + g * 0.1192 + b * 0.9505

  return [x * 100, y * 100, z * 100]
}

convert$1.rgb.lab = function (rgb) {
  const xyz = convert$1.rgb.xyz(rgb)
  let x = xyz[0]
  let y = xyz[1]
  let z = xyz[2]

  x /= 95.047
  y /= 100
  z /= 108.883

  x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116
  y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116
  z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116

  const l = 116 * y - 16
  const a = 500 * (x - y)
  const b = 200 * (y - z)

  return [l, a, b]
}

convert$1.hsl.rgb = function (hsl) {
  const h = hsl[0] / 360
  const s = hsl[1] / 100
  const l = hsl[2] / 100
  let t2
  let t3
  let val

  if (s === 0) {
    val = l * 255
    return [val, val, val]
  }

  if (l < 0.5) {
    t2 = l * (1 + s)
  } else {
    t2 = l + s - l * s
  }

  const t1 = 2 * l - t2

  const rgb = [0, 0, 0]
  for (let i = 0; i < 3; i++) {
    t3 = h + (1 / 3) * -(i - 1)
    if (t3 < 0) {
      t3++
    }

    if (t3 > 1) {
      t3--
    }

    if (6 * t3 < 1) {
      val = t1 + (t2 - t1) * 6 * t3
    } else if (2 * t3 < 1) {
      val = t2
    } else if (3 * t3 < 2) {
      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6
    } else {
      val = t1
    }

    rgb[i] = val * 255
  }

  return rgb
}

convert$1.hsl.hsv = function (hsl) {
  const h = hsl[0]
  let s = hsl[1] / 100
  let l = hsl[2] / 100
  let smin = s
  const lmin = Math.max(l, 0.01)

  l *= 2
  s *= l <= 1 ? l : 2 - l
  smin *= lmin <= 1 ? lmin : 2 - lmin
  const v = (l + s) / 2
  const sv =
    l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s)

  return [h, sv * 100, v * 100]
}

convert$1.hsv.rgb = function (hsv) {
  const h = hsv[0] / 60
  const s = hsv[1] / 100
  let v = hsv[2] / 100
  const hi = Math.floor(h) % 6

  const f = h - Math.floor(h)
  const p = 255 * v * (1 - s)
  const q = 255 * v * (1 - s * f)
  const t = 255 * v * (1 - s * (1 - f))
  v *= 255

  switch (hi) {
    case 0:
      return [v, t, p]
    case 1:
      return [q, v, p]
    case 2:
      return [p, v, t]
    case 3:
      return [p, q, v]
    case 4:
      return [t, p, v]
    case 5:
      return [v, p, q]
  }
}

convert$1.hsv.hsl = function (hsv) {
  const h = hsv[0]
  const s = hsv[1] / 100
  const v = hsv[2] / 100
  const vmin = Math.max(v, 0.01)
  let sl
  let l

  l = (2 - s) * v
  const lmin = (2 - s) * vmin
  sl = s * vmin
  sl /= lmin <= 1 ? lmin : 2 - lmin
  sl = sl || 0
  l /= 2

  return [h, sl * 100, l * 100]
}

// http://dev.w3.org/csswg/css-color/#hwb-to-rgb
convert$1.hwb.rgb = function (hwb) {
  const h = hwb[0] / 360
  let wh = hwb[1] / 100
  let bl = hwb[2] / 100
  const ratio = wh + bl
  let f

  // Wh + bl cant be > 1
  if (ratio > 1) {
    wh /= ratio
    bl /= ratio
  }

  const i = Math.floor(6 * h)
  const v = 1 - bl
  f = 6 * h - i

  if ((i & 0x01) !== 0) {
    f = 1 - f
  }

  const n = wh + f * (v - wh) // Linear interpolation

  let r
  let g
  let b
  /* eslint-disable max-statements-per-line,no-multi-spaces */
  switch (i) {
    default:
    case 6:
    case 0:
      r = v
      g = n
      b = wh
      break
    case 1:
      r = n
      g = v
      b = wh
      break
    case 2:
      r = wh
      g = v
      b = n
      break
    case 3:
      r = wh
      g = n
      b = v
      break
    case 4:
      r = n
      g = wh
      b = v
      break
    case 5:
      r = v
      g = wh
      b = n
      break
  }
  /* eslint-enable max-statements-per-line,no-multi-spaces */

  return [r * 255, g * 255, b * 255]
}

convert$1.cmyk.rgb = function (cmyk) {
  const c = cmyk[0] / 100
  const m = cmyk[1] / 100
  const y = cmyk[2] / 100
  const k = cmyk[3] / 100

  const r = 1 - Math.min(1, c * (1 - k) + k)
  const g = 1 - Math.min(1, m * (1 - k) + k)
  const b = 1 - Math.min(1, y * (1 - k) + k)

  return [r * 255, g * 255, b * 255]
}

convert$1.xyz.rgb = function (xyz) {
  const x = xyz[0] / 100
  const y = xyz[1] / 100
  const z = xyz[2] / 100
  let r
  let g
  let b

  r = x * 3.2406 + y * -1.5372 + z * -0.4986
  g = x * -0.9689 + y * 1.8758 + z * 0.0415
  b = x * 0.0557 + y * -0.204 + z * 1.057

  // Assume sRGB
  r =
    r > 0.0031308 ? 1.055 * r ** (1.0 / 2.4) - 0.055 : r * 12.92

  g =
    g > 0.0031308 ? 1.055 * g ** (1.0 / 2.4) - 0.055 : g * 12.92

  b =
    b > 0.0031308 ? 1.055 * b ** (1.0 / 2.4) - 0.055 : b * 12.92

  r = Math.min(Math.max(0, r), 1)
  g = Math.min(Math.max(0, g), 1)
  b = Math.min(Math.max(0, b), 1)

  return [r * 255, g * 255, b * 255]
}

convert$1.xyz.lab = function (xyz) {
  let x = xyz[0]
  let y = xyz[1]
  let z = xyz[2]

  x /= 95.047
  y /= 100
  z /= 108.883

  x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116
  y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116
  z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116

  const l = 116 * y - 16
  const a = 500 * (x - y)
  const b = 200 * (y - z)

  return [l, a, b]
}

convert$1.lab.xyz = function (lab) {
  const l = lab[0]
  const a = lab[1]
  const b = lab[2]
  let x
  let y
  let z

  y = (l + 16) / 116
  x = a / 500 + y
  z = y - b / 200

  const y2 = y ** 3
  const x2 = x ** 3
  const z2 = z ** 3
  y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787
  x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787
  z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787

  x *= 95.047
  y *= 100
  z *= 108.883

  return [x, y, z]
}

convert$1.lab.lch = function (lab) {
  const l = lab[0]
  const a = lab[1]
  const b = lab[2]
  let h

  const hr = Math.atan2(b, a)
  h = (hr * 360) / 2 / Math.PI

  if (h < 0) {
    h += 360
  }

  const c = Math.sqrt(a * a + b * b)

  return [l, c, h]
}

convert$1.lch.lab = function (lch) {
  const l = lch[0]
  const c = lch[1]
  const h = lch[2]

  const hr = (h / 360) * 2 * Math.PI
  const a = c * Math.cos(hr)
  const b = c * Math.sin(hr)

  return [l, a, b]
}

convert$1.rgb.ansi16 = function (args, saturation = null) {
  const [r, g, b] = args
  let value =
    saturation === null ? convert$1.rgb.hsv(args)[2] : saturation // Hsv -> ansi16 optimization

  value = Math.round(value / 50)

  if (value === 0) {
    return 30
  }

  let ansi =
    30 +
    ((Math.round(b / 255) << 2) |
      (Math.round(g / 255) << 1) |
      Math.round(r / 255))

  if (value === 2) {
    ansi += 60
  }

  return ansi
}

convert$1.hsv.ansi16 = function (args) {
  // Optimization here; we already know the value and don't need to get
  // it converted for us.
  return convert$1.rgb.ansi16(convert$1.hsv.rgb(args), args[2])
}

convert$1.rgb.ansi256 = function (args) {
  const r = args[0]
  const g = args[1]
  const b = args[2]

  // We use the extended greyscale palette here, with the exception of
  // black and white. normal palette only has 4 greyscale shades.
  if (r === g && g === b) {
    if (r < 8) {
      return 16
    }

    if (r > 248) {
      return 231
    }

    return Math.round(((r - 8) / 247) * 24) + 232
  }

  const ansi =
    16 +
    36 * Math.round((r / 255) * 5) +
    6 * Math.round((g / 255) * 5) +
    Math.round((b / 255) * 5)

  return ansi
}

convert$1.ansi16.rgb = function (args) {
  let color = args % 10

  // Handle greyscale
  if (color === 0 || color === 7) {
    if (args > 50) {
      color += 3.5
    }

    color = (color / 10.5) * 255

    return [color, color, color]
  }

  const mult = (~~(args > 50) + 1) * 0.5
  const r = (color & 1) * mult * 255
  const g = ((color >> 1) & 1) * mult * 255
  const b = ((color >> 2) & 1) * mult * 255

  return [r, g, b]
}

convert$1.ansi256.rgb = function (args) {
  // Handle greyscale
  if (args >= 232) {
    const c = (args - 232) * 10 + 8
    return [c, c, c]
  }

  args -= 16

  let rem
  const r = (Math.floor(args / 36) / 5) * 255
  const g = (Math.floor((rem = args % 36) / 6) / 5) * 255
  const b = ((rem % 6) / 5) * 255

  return [r, g, b]
}

convert$1.rgb.hex = function (args) {
  const integer =
    ((Math.round(args[0]) & 0xff) << 16) +
    ((Math.round(args[1]) & 0xff) << 8) +
    (Math.round(args[2]) & 0xff)

  const string = integer.toString(16).toUpperCase()
  return '000000'.substring(string.length) + string
}

convert$1.hex.rgb = function (args) {
  const match = args
    .toString(16)
    .match(/[a-f0-9]{6}|[a-f0-9]{3}/i)
  if (!match) {
    return [0, 0, 0]
  }

  let colorString = match[0]

  if (match[0].length === 3) {
    colorString = colorString
      .split('')
      .map(char => {
        return char + char
      })
      .join('')
  }

  const integer = parseInt(colorString, 16)
  const r = (integer >> 16) & 0xff
  const g = (integer >> 8) & 0xff
  const b = integer & 0xff

  return [r, g, b]
}

convert$1.rgb.hcg = function (rgb) {
  const r = rgb[0] / 255
  const g = rgb[1] / 255
  const b = rgb[2] / 255
  const max = Math.max(Math.max(r, g), b)
  const min = Math.min(Math.min(r, g), b)
  const chroma = max - min
  let grayscale
  let hue

  if (chroma < 1) {
    grayscale = min / (1 - chroma)
  } else {
    grayscale = 0
  }

  if (chroma <= 0) {
    hue = 0
  } else if (max === r) {
    hue = ((g - b) / chroma) % 6
  } else if (max === g) {
    hue = 2 + (b - r) / chroma
  } else {
    hue = 4 + (r - g) / chroma
  }

  hue /= 6
  hue %= 1

  return [hue * 360, chroma * 100, grayscale * 100]
}

convert$1.hsl.hcg = function (hsl) {
  const s = hsl[1] / 100
  const l = hsl[2] / 100

  const c = l < 0.5 ? 2.0 * s * l : 2.0 * s * (1.0 - l)

  let f = 0
  if (c < 1.0) {
    f = (l - 0.5 * c) / (1.0 - c)
  }

  return [hsl[0], c * 100, f * 100]
}

convert$1.hsv.hcg = function (hsv) {
  const s = hsv[1] / 100
  const v = hsv[2] / 100

  const c = s * v
  let f = 0

  if (c < 1.0) {
    f = (v - c) / (1 - c)
  }

  return [hsv[0], c * 100, f * 100]
}

convert$1.hcg.rgb = function (hcg) {
  const h = hcg[0] / 360
  const c = hcg[1] / 100
  const g = hcg[2] / 100

  if (c === 0.0) {
    return [g * 255, g * 255, g * 255]
  }

  const pure = [0, 0, 0]
  const hi = (h % 1) * 6
  const v = hi % 1
  const w = 1 - v
  let mg = 0

  /* eslint-disable max-statements-per-line */
  switch (Math.floor(hi)) {
    case 0:
      pure[0] = 1
      pure[1] = v
      pure[2] = 0
      break
    case 1:
      pure[0] = w
      pure[1] = 1
      pure[2] = 0
      break
    case 2:
      pure[0] = 0
      pure[1] = 1
      pure[2] = v
      break
    case 3:
      pure[0] = 0
      pure[1] = w
      pure[2] = 1
      break
    case 4:
      pure[0] = v
      pure[1] = 0
      pure[2] = 1
      break
    default:
      pure[0] = 1
      pure[1] = 0
      pure[2] = w
  }
  /* eslint-enable max-statements-per-line */

  mg = (1.0 - c) * g

  return [
    (c * pure[0] + mg) * 255,
    (c * pure[1] + mg) * 255,
    (c * pure[2] + mg) * 255,
  ]
}

convert$1.hcg.hsv = function (hcg) {
  const c = hcg[1] / 100
  const g = hcg[2] / 100

  const v = c + g * (1.0 - c)
  let f = 0

  if (v > 0.0) {
    f = c / v
  }

  return [hcg[0], f * 100, v * 100]
}

convert$1.hcg.hsl = function (hcg) {
  const c = hcg[1] / 100
  const g = hcg[2] / 100

  const l = g * (1.0 - c) + 0.5 * c
  let s = 0

  if (l > 0.0 && l < 0.5) {
    s = c / (2 * l)
  } else if (l >= 0.5 && l < 1.0) {
    s = c / (2 * (1 - l))
  }

  return [hcg[0], s * 100, l * 100]
}

convert$1.hcg.hwb = function (hcg) {
  const c = hcg[1] / 100
  const g = hcg[2] / 100
  const v = c + g * (1.0 - c)
  return [hcg[0], (v - c) * 100, (1 - v) * 100]
}

convert$1.hwb.hcg = function (hwb) {
  const w = hwb[1] / 100
  const b = hwb[2] / 100
  const v = 1 - b
  const c = v - w
  let g = 0

  if (c < 1) {
    g = (v - c) / (1 - c)
  }

  return [hwb[0], c * 100, g * 100]
}

convert$1.apple.rgb = function (apple) {
  return [
    (apple[0] / 65535) * 255,
    (apple[1] / 65535) * 255,
    (apple[2] / 65535) * 255,
  ]
}

convert$1.rgb.apple = function (rgb) {
  return [
    (rgb[0] / 255) * 65535,
    (rgb[1] / 255) * 65535,
    (rgb[2] / 255) * 65535,
  ]
}

convert$1.gray.rgb = function (args) {
  return [
    (args[0] / 100) * 255,
    (args[0] / 100) * 255,
    (args[0] / 100) * 255,
  ]
}

convert$1.gray.hsl = function (args) {
  return [0, 0, args[0]]
}

convert$1.gray.hsv = convert$1.gray.hsl

convert$1.gray.hwb = function (gray) {
  return [0, 100, gray[0]]
}

convert$1.gray.cmyk = function (gray) {
  return [0, 0, 0, gray[0]]
}

convert$1.gray.lab = function (gray) {
  return [gray[0], 0, 0]
}

convert$1.gray.hex = function (gray) {
  const val = Math.round((gray[0] / 100) * 255) & 0xff
  const integer = (val << 16) + (val << 8) + val

  const string = integer.toString(16).toUpperCase()
  return '000000'.substring(string.length) + string
}

convert$1.rgb.gray = function (rgb) {
  const val = (rgb[0] + rgb[1] + rgb[2]) / 3
  return [(val / 255) * 100]
}

const conversions$1 = conversions$2

/*
	This function routes a model to all other models.

	all functions that are routed have a property `.conversion` attached
	to the returned synthetic function. This property is an array
	of strings, each with the steps in between the 'from' and 'to'
	color models (inclusive).

	conversions that are not possible simply are not included.
*/

function buildGraph() {
  const graph = {}
  // https://jsperf.com/object-keys-vs-for-in-with-closure/3
  const models = Object.keys(conversions$1)

  for (let len = models.length, i = 0; i < len; i++) {
    graph[models[i]] = {
      // http://jsperf.com/1-vs-infinity
      // micro-opt, but this is simple.
      distance: -1,
      parent: null,
    }
  }

  return graph
}

// https://en.wikipedia.org/wiki/Breadth-first_search
function deriveBFS(fromModel) {
  const graph = buildGraph()
  const queue = [fromModel] // Unshift -> queue -> pop

  graph[fromModel].distance = 0

  while (queue.length) {
    const current = queue.pop()
    const adjacents = Object.keys(conversions$1[current])

    for (let len = adjacents.length, i = 0; i < len; i++) {
      const adjacent = adjacents[i]
      const node = graph[adjacent]

      if (node.distance === -1) {
        node.distance = graph[current].distance + 1
        node.parent = current
        queue.unshift(adjacent)
      }
    }
  }

  return graph
}

function link(from, to) {
  return function (args) {
    return to(from(args))
  }
}

function wrapConversion(toModel, graph) {
  const path = [graph[toModel].parent, toModel]
  let fn = conversions$1[graph[toModel].parent][toModel]

  let cur = graph[toModel].parent
  while (graph[cur].parent) {
    path.unshift(graph[cur].parent)
    fn = link(conversions$1[graph[cur].parent][cur], fn)
    cur = graph[cur].parent
  }

  fn.conversion = path
  return fn
}

var route$1 = function (fromModel) {
  const graph = deriveBFS(fromModel)
  const conversion = {}

  const models = Object.keys(graph)
  for (let len = models.length, i = 0; i < len; i++) {
    const toModel = models[i]
    const node = graph[toModel]

    if (node.parent === null) {
      // No possible conversion, or this node is the source model.
      continue
    }

    conversion[toModel] = wrapConversion(toModel, graph)
  }

  return conversion
}

const conversions = conversions$2
const route = route$1

const convert = {}

const models = Object.keys(conversions)

function wrapRaw(fn) {
  const wrappedFn = function (...args) {
    const arg0 = args[0]
    if (arg0 === undefined || arg0 === null) {
      return arg0
    }

    if (arg0.length > 1) {
      args = arg0
    }

    return fn(args)
  }

  // Preserve .conversion property if there is one
  if ('conversion' in fn) {
    wrappedFn.conversion = fn.conversion
  }

  return wrappedFn
}

function wrapRounded(fn) {
  const wrappedFn = function (...args) {
    const arg0 = args[0]

    if (arg0 === undefined || arg0 === null) {
      return arg0
    }

    if (arg0.length > 1) {
      args = arg0
    }

    const result = fn(args)

    // We're assuming the result is an array here.
    // see notice in conversions.js; don't use box types
    // in conversion functions.
    if (typeof result === 'object') {
      for (let len = result.length, i = 0; i < len; i++) {
        result[i] = Math.round(result[i])
      }
    }

    return result
  }

  // Preserve .conversion property if there is one
  if ('conversion' in fn) {
    wrappedFn.conversion = fn.conversion
  }

  return wrappedFn
}

models.forEach(fromModel => {
  convert[fromModel] = {}

  Object.defineProperty(convert[fromModel], 'channels', {
    value: conversions[fromModel].channels,
  })
  Object.defineProperty(convert[fromModel], 'labels', {
    value: conversions[fromModel].labels,
  })

  const routes = route(fromModel)
  const routeModels = Object.keys(routes)

  routeModels.forEach(toModel => {
    const fn = routes[toModel]

    convert[fromModel][toModel] = wrapRounded(fn)
    convert[fromModel][toModel].raw = wrapRaw(fn)
  })
})

var colorConvert = convert

;(function (module) {
  const wrapAnsi16 =
    (fn, offset) =>
    (...args) => {
      const code = fn(...args)
      return `\u001B[${code + offset}m`
    }

  const wrapAnsi256 =
    (fn, offset) =>
    (...args) => {
      const code = fn(...args)
      return `\u001B[${38 + offset};5;${code}m`
    }

  const wrapAnsi16m =
    (fn, offset) =>
    (...args) => {
      const rgb = fn(...args)
      return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${
        rgb[2]
      }m`
    }

  const ansi2ansi = n => n
  const rgb2rgb = (r, g, b) => [r, g, b]

  const setLazyProperty = (object, property, get) => {
    Object.defineProperty(object, property, {
      get: () => {
        const value = get()

        Object.defineProperty(object, property, {
          value,
          enumerable: true,
          configurable: true,
        })

        return value
      },
      enumerable: true,
      configurable: true,
    })
  }

  /** @type {typeof import('color-convert')} */
  let colorConvert$1
  const makeDynamicStyles = (
    wrap,
    targetSpace,
    identity,
    isBackground,
  ) => {
    if (colorConvert$1 === undefined) {
      colorConvert$1 = colorConvert
    }

    const offset = isBackground ? 10 : 0
    const styles = {}

    for (const [sourceSpace, suite] of Object.entries(
      colorConvert$1,
    )) {
      const name =
        sourceSpace === 'ansi16' ? 'ansi' : sourceSpace
      if (sourceSpace === targetSpace) {
        styles[name] = wrap(identity, offset)
      } else if (typeof suite === 'object') {
        styles[name] = wrap(suite[targetSpace], offset)
      }
    }

    return styles
  }

  function assembleStyles() {
    const codes = new Map()
    const styles = {
      modifier: {
        reset: [0, 0],
        // 21 isn't widely supported and 22 does the same thing
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29],
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],

        // Bright color
        blackBright: [90, 39],
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39],
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],

        // Bright color
        bgBlackBright: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49],
      },
    }

    // Alias bright black as gray (and grey)
    styles.color.gray = styles.color.blackBright
    styles.bgColor.bgGray = styles.bgColor.bgBlackBright
    styles.color.grey = styles.color.blackBright
    styles.bgColor.bgGrey = styles.bgColor.bgBlackBright

    for (const [groupName, group] of Object.entries(styles)) {
      for (const [styleName, style] of Object.entries(group)) {
        styles[styleName] = {
          open: `\u001B[${style[0]}m`,
          close: `\u001B[${style[1]}m`,
        }

        group[styleName] = styles[styleName]

        codes.set(style[0], style[1])
      }

      Object.defineProperty(styles, groupName, {
        value: group,
        enumerable: false,
      })
    }

    Object.defineProperty(styles, 'codes', {
      value: codes,
      enumerable: false,
    })

    styles.color.close = '\u001B[39m'
    styles.bgColor.close = '\u001B[49m'

    setLazyProperty(styles.color, 'ansi', () =>
      makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false),
    )
    setLazyProperty(styles.color, 'ansi256', () =>
      makeDynamicStyles(
        wrapAnsi256,
        'ansi256',
        ansi2ansi,
        false,
      ),
    )
    setLazyProperty(styles.color, 'ansi16m', () =>
      makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false),
    )
    setLazyProperty(styles.bgColor, 'ansi', () =>
      makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true),
    )
    setLazyProperty(styles.bgColor, 'ansi256', () =>
      makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true),
    )
    setLazyProperty(styles.bgColor, 'ansi16m', () =>
      makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true),
    )

    return styles
  }

  // Make the export immutable
  Object.defineProperty(module, 'exports', {
    enumerable: true,
    get: assembleStyles,
  })
})(ansiStyles$1)

var hasFlag$1 = (flag, argv = process.argv) => {
  const prefix = flag.startsWith('-')
    ? ''
    : flag.length === 1
    ? '-'
    : '--'
  const position = argv.indexOf(prefix + flag)
  const terminatorPosition = argv.indexOf('--')
  return (
    position !== -1 &&
    (terminatorPosition === -1 || position < terminatorPosition)
  )
}

const os = require$$0__default$3['default']
const tty = require$$1__default['default']
const hasFlag = hasFlag$1

const {env} = process

let forceColor
if (
  hasFlag('no-color') ||
  hasFlag('no-colors') ||
  hasFlag('color=false') ||
  hasFlag('color=never')
) {
  forceColor = 0
} else if (
  hasFlag('color') ||
  hasFlag('colors') ||
  hasFlag('color=true') ||
  hasFlag('color=always')
) {
  forceColor = 1
}

if ('FORCE_COLOR' in env) {
  if (env.FORCE_COLOR === 'true') {
    forceColor = 1
  } else if (env.FORCE_COLOR === 'false') {
    forceColor = 0
  } else {
    forceColor =
      env.FORCE_COLOR.length === 0
        ? 1
        : Math.min(parseInt(env.FORCE_COLOR, 10), 3)
  }
}

function translateLevel(level) {
  if (level === 0) {
    return false
  }

  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3,
  }
}

function supportsColor(haveStream, streamIsTTY) {
  if (forceColor === 0) {
    return 0
  }

  if (
    hasFlag('color=16m') ||
    hasFlag('color=full') ||
    hasFlag('color=truecolor')
  ) {
    return 3
  }

  if (hasFlag('color=256')) {
    return 2
  }

  if (haveStream && !streamIsTTY && forceColor === undefined) {
    return 0
  }

  const min = forceColor || 0

  if (env.TERM === 'dumb') {
    return min
  }

  if (process.platform === 'win32') {
    // Windows 10 build 10586 is the first Windows release that supports 256 colors.
    // Windows 10 build 14931 is the first release that supports 16m/TrueColor.
    const osRelease = os.release().split('.')
    if (
      Number(osRelease[0]) >= 10 &&
      Number(osRelease[2]) >= 10586
    ) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2
    }

    return 1
  }

  if ('CI' in env) {
    if (
      [
        'TRAVIS',
        'CIRCLECI',
        'APPVEYOR',
        'GITLAB_CI',
        'GITHUB_ACTIONS',
        'BUILDKITE',
      ].some(sign => sign in env) ||
      env.CI_NAME === 'codeship'
    ) {
      return 1
    }

    return min
  }

  if ('TEAMCITY_VERSION' in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(
      env.TEAMCITY_VERSION,
    )
      ? 1
      : 0
  }

  if (env.COLORTERM === 'truecolor') {
    return 3
  }

  if ('TERM_PROGRAM' in env) {
    const version = parseInt(
      (env.TERM_PROGRAM_VERSION || '').split('.')[0],
      10,
    )

    switch (env.TERM_PROGRAM) {
      case 'iTerm.app':
        return version >= 3 ? 3 : 2
      case 'Apple_Terminal':
        return 2
      // No default
    }
  }

  if (/-256(color)?$/i.test(env.TERM)) {
    return 2
  }

  if (
    /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
      env.TERM,
    )
  ) {
    return 1
  }

  if ('COLORTERM' in env) {
    return 1
  }

  return min
}

function getSupportLevel(stream) {
  const level = supportsColor(stream, stream && stream.isTTY)
  return translateLevel(level)
}

var supportsColor_1 = {
  supportsColor: getSupportLevel,
  stdout: translateLevel(supportsColor(true, tty.isatty(1))),
  stderr: translateLevel(supportsColor(true, tty.isatty(2))),
}

const stringReplaceAll$1 = (string, substring, replacer) => {
  let index = string.indexOf(substring)
  if (index === -1) {
    return string
  }

  const substringLength = substring.length
  let endIndex = 0
  let returnValue = ''
  do {
    returnValue +=
      string.substr(endIndex, index - endIndex) +
      substring +
      replacer
    endIndex = index + substringLength
    index = string.indexOf(substring, endIndex)
  } while (index !== -1)

  returnValue += string.substr(endIndex)
  return returnValue
}

const stringEncaseCRLFWithFirstIndex$1 = (
  string,
  prefix,
  postfix,
  index,
) => {
  let endIndex = 0
  let returnValue = ''
  do {
    const gotCR = string[index - 1] === '\r'
    returnValue +=
      string.substr(
        endIndex,
        (gotCR ? index - 1 : index) - endIndex,
      ) +
      prefix +
      (gotCR ? '\r\n' : '\n') +
      postfix
    endIndex = index + 1
    index = string.indexOf('\n', endIndex)
  } while (index !== -1)

  returnValue += string.substr(endIndex)
  return returnValue
}

var util = {
  stringReplaceAll: stringReplaceAll$1,
  stringEncaseCRLFWithFirstIndex:
    stringEncaseCRLFWithFirstIndex$1,
}

const TEMPLATE_REGEX =
  /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi
const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g
const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/
const ESCAPE_REGEX =
  /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi

const ESCAPES = new Map([
  ['n', '\n'],
  ['r', '\r'],
  ['t', '\t'],
  ['b', '\b'],
  ['f', '\f'],
  ['v', '\v'],
  ['0', '\0'],
  ['\\', '\\'],
  ['e', '\u001B'],
  ['a', '\u0007'],
])

function unescape(c) {
  const u = c[0] === 'u'
  const bracket = c[1] === '{'

  if (
    (u && !bracket && c.length === 5) ||
    (c[0] === 'x' && c.length === 3)
  ) {
    return String.fromCharCode(parseInt(c.slice(1), 16))
  }

  if (u && bracket) {
    return String.fromCodePoint(parseInt(c.slice(2, -1), 16))
  }

  return ESCAPES.get(c) || c
}

function parseArguments(name, arguments_) {
  const results = []
  const chunks = arguments_.trim().split(/\s*,\s*/g)
  let matches

  for (const chunk of chunks) {
    const number = Number(chunk)
    if (!Number.isNaN(number)) {
      results.push(number)
    } else if ((matches = chunk.match(STRING_REGEX))) {
      results.push(
        matches[2].replace(
          ESCAPE_REGEX,
          (m, escape, character) =>
            escape ? unescape(escape) : character,
        ),
      )
    } else {
      throw new Error(
        `Invalid Chalk template style argument: ${chunk} (in style '${name}')`,
      )
    }
  }

  return results
}

function parseStyle(style) {
  STYLE_REGEX.lastIndex = 0

  const results = []
  let matches

  while ((matches = STYLE_REGEX.exec(style)) !== null) {
    const name = matches[1]

    if (matches[2]) {
      const args = parseArguments(name, matches[2])
      results.push([name].concat(args))
    } else {
      results.push([name])
    }
  }

  return results
}

function buildStyle(chalk, styles) {
  const enabled = {}

  for (const layer of styles) {
    for (const style of layer.styles) {
      enabled[style[0]] = layer.inverse ? null : style.slice(1)
    }
  }

  let current = chalk
  for (const [styleName, styles] of Object.entries(enabled)) {
    if (!Array.isArray(styles)) {
      continue
    }

    if (!(styleName in current)) {
      throw new Error(`Unknown Chalk style: ${styleName}`)
    }

    current =
      styles.length > 0
        ? current[styleName](...styles)
        : current[styleName]
  }

  return current
}

var templates = (chalk, temporary) => {
  const styles = []
  const chunks = []
  let chunk = []

  // eslint-disable-next-line max-params
  temporary.replace(
    TEMPLATE_REGEX,
    (m, escapeCharacter, inverse, style, close, character) => {
      if (escapeCharacter) {
        chunk.push(unescape(escapeCharacter))
      } else if (style) {
        const string = chunk.join('')
        chunk = []
        chunks.push(
          styles.length === 0
            ? string
            : buildStyle(chalk, styles)(string),
        )
        styles.push({inverse, styles: parseStyle(style)})
      } else if (close) {
        if (styles.length === 0) {
          throw new Error(
            'Found extraneous } in Chalk template literal',
          )
        }

        chunks.push(buildStyle(chalk, styles)(chunk.join('')))
        chunk = []
        styles.pop()
      } else {
        chunk.push(character)
      }
    },
  )

  chunks.push(chunk.join(''))

  if (styles.length > 0) {
    const errMessage = `Chalk template literal is missing ${
      styles.length
    } closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`
    throw new Error(errMessage)
  }

  return chunks.join('')
}

const ansiStyles = ansiStyles$1.exports
const {stdout: stdoutColor, stderr: stderrColor} =
  supportsColor_1
const {stringReplaceAll, stringEncaseCRLFWithFirstIndex} = util

const {isArray} = Array

// `supportsColor.level` → `ansiStyles.color[name]` mapping
const levelMapping = ['ansi', 'ansi', 'ansi256', 'ansi16m']

const styles = Object.create(null)

const applyOptions = (object, options = {}) => {
  if (
    options.level &&
    !(
      Number.isInteger(options.level) &&
      options.level >= 0 &&
      options.level <= 3
    )
  ) {
    throw new Error(
      'The `level` option should be an integer from 0 to 3',
    )
  }

  // Detect level if not set manually
  const colorLevel = stdoutColor ? stdoutColor.level : 0
  object.level =
    options.level === undefined ? colorLevel : options.level
}

class ChalkClass {
  constructor(options) {
    // eslint-disable-next-line no-constructor-return
    return chalkFactory(options)
  }
}

const chalkFactory = options => {
  const chalk = {}
  applyOptions(chalk, options)

  chalk.template = (...arguments_) =>
    chalkTag(chalk.template, ...arguments_)

  Object.setPrototypeOf(chalk, Chalk.prototype)
  Object.setPrototypeOf(chalk.template, chalk)

  chalk.template.constructor = () => {
    throw new Error(
      '`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.',
    )
  }

  chalk.template.Instance = ChalkClass

  return chalk.template
}

function Chalk(options) {
  return chalkFactory(options)
}

for (const [styleName, style] of Object.entries(ansiStyles)) {
  styles[styleName] = {
    get() {
      const builder = createBuilder(
        this,
        createStyler(style.open, style.close, this._styler),
        this._isEmpty,
      )
      Object.defineProperty(this, styleName, {value: builder})
      return builder
    },
  }
}

styles.visible = {
  get() {
    const builder = createBuilder(this, this._styler, true)
    Object.defineProperty(this, 'visible', {value: builder})
    return builder
  },
}

const usedModels = [
  'rgb',
  'hex',
  'keyword',
  'hsl',
  'hsv',
  'hwb',
  'ansi',
  'ansi256',
]

for (const model of usedModels) {
  styles[model] = {
    get() {
      const {level} = this
      return function (...arguments_) {
        const styler = createStyler(
          ansiStyles.color[levelMapping[level]][model](
            ...arguments_,
          ),
          ansiStyles.color.close,
          this._styler,
        )
        return createBuilder(this, styler, this._isEmpty)
      }
    },
  }
}

for (const model of usedModels) {
  const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1)
  styles[bgModel] = {
    get() {
      const {level} = this
      return function (...arguments_) {
        const styler = createStyler(
          ansiStyles.bgColor[levelMapping[level]][model](
            ...arguments_,
          ),
          ansiStyles.bgColor.close,
          this._styler,
        )
        return createBuilder(this, styler, this._isEmpty)
      }
    },
  }
}

const proto = Object.defineProperties(() => {}, {
  ...styles,
  level: {
    enumerable: true,
    get() {
      return this._generator.level
    },
    set(level) {
      this._generator.level = level
    },
  },
})

const createStyler = (open, close, parent) => {
  let openAll
  let closeAll
  if (parent === undefined) {
    openAll = open
    closeAll = close
  } else {
    openAll = parent.openAll + open
    closeAll = close + parent.closeAll
  }

  return {
    open,
    close,
    openAll,
    closeAll,
    parent,
  }
}

const createBuilder = (self, _styler, _isEmpty) => {
  const builder = (...arguments_) => {
    if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
      // Called as a template literal, for example: chalk.red`2 + 3 = {bold ${2+3}}`
      return applyStyle(
        builder,
        chalkTag(builder, ...arguments_),
      )
    }

    // Single argument is hot path, implicit coercion is faster than anything
    // eslint-disable-next-line no-implicit-coercion
    return applyStyle(
      builder,
      arguments_.length === 1
        ? '' + arguments_[0]
        : arguments_.join(' '),
    )
  }

  // We alter the prototype because we must return a function, but there is
  // no way to create a function with a different prototype
  Object.setPrototypeOf(builder, proto)

  builder._generator = self
  builder._styler = _styler
  builder._isEmpty = _isEmpty

  return builder
}

const applyStyle = (self, string) => {
  if (self.level <= 0 || !string) {
    return self._isEmpty ? '' : string
  }

  let styler = self._styler

  if (styler === undefined) {
    return string
  }

  const {openAll, closeAll} = styler
  if (string.indexOf('\u001B') !== -1) {
    while (styler !== undefined) {
      // Replace any instances already present with a re-opening code
      // otherwise only the part of the string until said closing code
      // will be colored, and the rest will simply be 'plain'.
      string = stringReplaceAll(
        string,
        styler.close,
        styler.open,
      )

      styler = styler.parent
    }
  }

  // We can move both next actions out of loop, because remaining actions in loop won't have
  // any/visible effect on parts we add here. Close the styling before a linebreak and reopen
  // after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
  const lfIndex = string.indexOf('\n')
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(
      string,
      closeAll,
      openAll,
      lfIndex,
    )
  }

  return openAll + string + closeAll
}

let template
const chalkTag = (chalk, ...strings) => {
  const [firstString] = strings

  if (!isArray(firstString) || !isArray(firstString.raw)) {
    // If chalk() was called by itself or with a string,
    // return the string itself as a string.
    return strings.join(' ')
  }

  const arguments_ = strings.slice(1)
  const parts = [firstString.raw[0]]

  for (let i = 1; i < firstString.length; i++) {
    parts.push(
      String(arguments_[i - 1]).replace(/[{}\\]/g, '\\$&'),
      String(firstString.raw[i]),
    )
  }

  if (template === undefined) {
    template = templates
  }

  return template(chalk, parts.join(''))
}

Object.defineProperties(Chalk.prototype, styles)

const chalk = Chalk() // eslint-disable-line new-cap
chalk.supportsColor = stdoutColor
chalk.stderr = Chalk({
  level: stderrColor ? stderrColor.level : 0,
}) // eslint-disable-line new-cap
chalk.stderr.supportsColor = stderrColor

async function sh(cmds, useIdent = true) {
  await Promise.all(
    cmds.map(async cmd => {
      const stdout = d => {
        this.context.stdout.write(
          d.toString().replace(/➤\sYN\d\d\d\d:\s/g, ''),
        )
      }

      const [invoke, ...params] = cmd.split(' ')

      try {
        const task = execa$1(invoke, params)

        task.stdout.on('data', stdout)
        task.stderr.on('data', stdout)

        return task
      } catch (err) {
        throw new Error(err)
      }
    }),
  )

  return Promise.resolve()
}

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var dev = Command =>
  class extends Command {
    static paths = [[`proj`, `make`]]

    static usage = {
      category: `task`,
      description: `build the project`,
      examples: [[`Build everything`, `yarn make`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn proj clean`])
      await $([`yarn install --immutable`])
      await $([`yarn proj build`])
      await $([
        `yarn proj test`,
        `yarn proj lint`,
        `yarn proj site`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var ci = Command =>
  class extends Command {
    static paths = [[`proj`, `make`, `ci`]]

    static usage = {
      category: `task`,
      description: `build the project (CI)`,
      examples: [[`Build for ci`, `yarn make ci`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn install --immutable`])
      await $([`yarn proj build cjs`])
      await $([`yarn proj test`])
      await $([`yarn proj site`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var clean$1 = Command =>
  class extends Command {
    static paths = [[`proj`, `make`, `clean`]]

    static usage = {
      category: `task`,
      description: `build the project`,
      examples: [
        [`Build everything from clean base`, `yarn make clean`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn clean`])
      await $([`yarn install --immutable`])
      await $([`yarn proj build`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var clean = Command =>
  class extends Command {
    static paths = [[`proj`, `clean`]]

    static usage = {
      category: `task`,
      description: `Clean project of all built artifacts`,
      examples: [[`Clean`, `yarn clean`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `rm -rf **/.budfiles`,
        `rm -rf **/node_modules`,
        `rm -rf examples/*/dist`,
        `rm -rf examples/sage/public/*`,
        `rm -rf examples/sage/storage/bud/*`,
        `rm -rf packages/*/*/lib`,
        `rm -rf packages/*/*/types`,
      ])

      await $([`yarn cache clean`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var all$3 = Command =>
  class extends Command {
    static paths = [[`proj`, `profile`]]

    static usage = {
      category: `task`,
      description: `Profile all build processes`,
      examples: [
        [`Profile all build processes`, `yarn proj profile`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)
      await $([`yarn proj profile cjs`, `yarn proj profile esm`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var cjs$1 = Command =>
  class extends Command {
    static paths = [[`proj`, `profile`, `cjs`]]

    static usage = {
      category: `task`,
      description: `Profile build (cjs)`,
      examples: [
        [`Profile cjs build process`, `yarn proj profile cjs`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings --topological-dev run profile:cjs`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var esm$1 = Command =>
  class extends Command {
    static paths = [[`proj`, `profile`, `esm`]]

    static usage = {
      category: `task`,
      description: `profile esm`,
      examples: [
        [`Profile esm build process`, `yarn proj profile esm`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings --topological-dev run profile:esm`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var build = Command =>
  class extends Command {
    static paths = [[`proj`, `site`]]

    static usage = {
      category: `task`,
      description: `Build site`,
      examples: [[`Build site`, `yarn proj site`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn ts-node ./dev/site`,
        `yarn proj site readme`,
      ])
      await $([`yarn docusaurus build`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var readme = Command =>
  class extends Command {
    static paths = [[`proj`, `site`, `readme`]]

    static usage = {
      category: `task`,
      description: `rebuild readmes`,
      examples: [[`Make site`, `yarn proj site readme`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn ts-node ./dev/readme`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var start = Command =>
  class extends Command {
    static paths = [[`proj`, `site`, `start`]]

    static usage = {
      category: `task`,
      description: `site start`,
      examples: [[`Build site`, `yarn proj site start`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn ts-node ./dev/site`])
      await $([`yarn docusaurus start`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var all$2 = Command =>
  class extends Command {
    static paths = [[`proj`, `build`]]

    static usage = {
      category: `task`,
      description: `Build project source`,
      examples: [[`Build packages`, `yarn proj build`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn proj build cjs`, `yarn proj build esm`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var cjs = Command =>
  class extends Command {
    static paths = [[`proj`, `build`, `cjs`]]

    static usage = {
      category: `task`,
      description: `build project source (cjs)`,
      examples: [[`Build cjs packages`, `yarn proj build cjs`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --topological-dev --no-private --exclude @roots/bud-typings -i -p -v run build:cjs`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var esm = Command =>
  class extends Command {
    static paths = [[`proj`, `build`, `esm`]]

    static usage = {
      category: `task`,
      description: `build project source (esm)`,
      examples: [[`Build esm packages`, `yarn proj build esm`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --topological-dev --no-private --exclude @roots/bud-typings -i -p -v run build:esm`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var all$1 = Command =>
  class extends Command {
    static paths = [[`proj`, `lint`]]

    static usage = {
      category: `task`,
      description: `Runs all linters`,
      examples: [[`Run all linters`, `yarn proj lint`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn proj lint eslint`,
        `yarn proj lint skypack`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var eslint = Command =>
  class extends Command {
    static paths = [[`proj`, `lint`, `eslint`]]

    static usage = {
      category: `task`,
      description: `Run eslint`,
      examples: [
        [`Lint packaged code`, `yarn proj lint eslint`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings -p -v run lint`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var skypack = Command =>
  class extends Command {
    static paths = [[`proj`, `lint`, `skypack`]]

    static usage = {
      category: `task`,
      description: `Run skypack`,
      examples: [
        [`Lint packaged code`, `yarn proj lint skypack`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings -p -v run pkg`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var all = Command =>
  class extends Command {
    static paths = [[`proj`, `test`]]

    static usage = {
      category: `task`,
      description: `Run all test suites`,
      examples: [[`Run tests`, `yarn proj test`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn proj test unit`], false)
      await $([`yarn proj test integration`], false)
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var integration = Command =>
  class extends Command {
    static paths = [[`proj`, `test`, `integration`]]

    static usage = {
      category: `task`,
      description: `Run integration test suite`,
      examples: [
        [
          `Run integration test suite`,
          `yarn proj test integration`,
        ],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`node ./jest.integration.js`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var unit = Command =>
  class extends Command {
    static paths = [[`proj`, `test`, `unit`]]

    static usage = {
      category: `task`,
      description: `Run unit test suite`,

      examples: [[`Run unit test suite`, `yarn proj test unit`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $(
        [
          `yarn jest --coverage --testPathIgnorePatterns="tests/integration" --testPathIgnorePatterns="tests/util"`,
        ],
        false,
      )
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

const plugin = {
  name: `plugin-bud`,
  factory: require => {
    const {Command} = require('clipanion')

    return {
      commands: [
        clean(Command),
        dev(Command),
        ci(Command),
        clean$1(Command),
        all(Command),
        unit(Command),
        integration(Command),
        all$3(Command),
        cjs$1(Command),
        esm$1(Command),
        all$2(Command),
        cjs(Command),
        esm(Command),
        all$1(Command),
        skypack(Command),
        eslint(Command),
        build(Command),
        readme(Command),
        start(Command),
      ],
    }
  },
}

module.exports = plugin
