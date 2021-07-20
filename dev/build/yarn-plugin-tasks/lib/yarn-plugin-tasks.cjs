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

const os = require$$0__default$3['default']
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
    signal === os.constants.signals.SIGTERM ||
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

async function sh(cmds) {
  await Promise.all(
    cmds.map(async cmd => {
      const [invoke, ...params] = cmd.split(' ')
      const task = execa$1(invoke, params)

      task.stdout.on('data', d =>
        this.context.stdout.write(
          d.toString().replace(/YN\d\d\d\d:\s/g, ''),
        ),
      )

      return task
    }),
  )

  return Promise.resolve()
}

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var make = Command =>
  class extends Command {
    static paths = [[`task`, `make`]]

    static usage = {
      category: `task`,
      description: `build the project`,
      examples: [[`Build everything`, `yarn task make`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn task clean`])
      await $([`yarn install --immutable`])
      await $([`yarn task build`])
      await $([`yarn task test`])
      await $([`yarn task lint`, `yarn task site`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var clean = Command =>
  class extends Command {
    static paths = [[`task`, `clean`]]

    static usage = {
      category: `task`,
      description: `Clean project of all built artifacts`,
      examples: [[`Clean`, `yarn task clean`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `rm -rf **/.budfiles`,
        `rm -rf **/node_modules`,
        `rm -rf examples/*/.budfiles`,
        `rm -rf examples/sage/public/*`,
        `rm -rf examples/sage/storage/bud/*`,
        `rm -rf examples/*/dist`,
        `rm -rf packages/*/*/lib`,
        `rm -rf packages/*/*/types`,
      ])

      await $([`yarn cache clean`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var all$3 = Command =>
  class extends Command {
    static paths = [[`task`, `profile`]]

    static usage = {
      category: `task`,
      description: `profile`,
      examples: [
        [`Profile all build processes`, `yarn task profile`],
      ],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --no-private --exclude @roots/bud-typings --topological-dev run profile`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var cjs$1 = Command =>
  class extends Command {
    static paths = [[`task`, `profile:cjs`]]

    static usage = {
      category: `task`,
      description: `profile:cjs`,
      examples: [
        [`Profile cjs build process`, `yarn task profile:cjs`],
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
    static paths = [[`task`, `profile:esm`]]

    static usage = {
      category: `task`,
      description: `profile:esm`,
      examples: [
        [`Profile esm build process`, `yarn task profile:esm`],
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
    static paths = [[`task`, `site`]]

    static usage = {
      category: `task`,
      description: `Build site`,
      examples: [[`Build site`, `yarn task site`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn ts-node ./dev/site`,
        `yarn task site:readme`,
      ])
      await $([`yarn docusaurus build`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var readme = Command =>
  class extends Command {
    static paths = [[`task`, `site:readme`]]

    static usage = {
      category: `task`,
      description: `rebuild readmes`,
      examples: [[`Make site`, `yarn task site:readme`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn ts-node ./dev/readme`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var start = Command =>
  class extends Command {
    static paths = [[`task`, `site:start`]]

    static usage = {
      category: `task`,
      description: `site:start`,
      examples: [[`Build site`, `yarn task site:start`]],
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
    static paths = [[`task`, `build`]]

    static usage = {
      category: `task`,
      description: `build`,
      details: `
       Lint and prettify packaged code
     `,
      examples: [[`Build packages`, `yarn task build`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn workspaces foreach --topological-dev --no-private --exclude @roots/bud-typings -i -p -v run build`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var cjs = Command =>
  class extends Command {
    static paths = [[`task`, `build:cjs`]]

    static usage = {
      category: `task`,
      description: `build:cjs`,
      details: `
       Build cjs
     `,
      examples: [[`Build cjs packages`, `yarn task build:cjs`]],
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
    static paths = [[`task`, `build:esm`]]

    static usage = {
      category: `task`,
      description: `build:esm`,
      details: `
       Build esm
     `,
      examples: [[`Build esm packages`, `yarn task build:esm`]],
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
    static paths = [[`task`, `lint`]]

    static usage = {
      category: `task`,
      description: `lint`,
      details: `
       Runs all linters
     `,
      examples: [[`Run all linters`, `yarn task lint`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn task lint:eslint`,
        `yarn task lint:skypack`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var eslint = Command =>
  class extends Command {
    static paths = [[`task`, `lint:eslint`]]

    static usage = {
      category: `task`,
      description: `lint:eslint`,
      details: `
       Lint packaged code
     `,
      examples: [
        [`Lint packaged code`, `yarn task lint:eslint`],
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
    static paths = [[`task`, `lint:skypack`]]

    static usage = {
      category: `task`,
      description: `lint:skypack`,
      examples: [
        [`Lint packaged code`, `yarn task lint:skypack`],
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
    static paths = [[`task`, `test`]]

    static usage = {
      category: `task`,
      description: `test`,
      details: `
       Run all test suites
     `,
      examples: [[`Run tests`, `yarn task test`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([`yarn task test:unit`])
      await $([`yarn task test:integration`])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

var integration = Command =>
  class extends Command {
    static paths = [[`task`, `test:integration`]]

    static usage = {
      category: `task`,
      description: `Run integration test suite`,
      examples: [
        [
          `Run integration test suite`,
          `yarn task test integration`,
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
    static paths = [[`task`, `test:unit`]]

    static usage = {
      category: `task`,
      description: `Run unit test suite`,

      examples: [[`Run unit test suite`, `yarn task test:unit`]],
    }

    async execute() {
      const $ = sh.bind(this)

      await $([
        `yarn jest --coverage --testPathIgnorePatterns="tests/integration" --testPathIgnorePatterns="tests/util"`,
      ])
    }
  }

/* eslint-disable @typescript-eslint/explicit-member-accessibility */

const plugin = {
  name: `plugin-bud`,
  factory: require => {
    const {Command} = require('clipanion')

    return {
      commands: [
        make(Command),
        clean(Command),
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
