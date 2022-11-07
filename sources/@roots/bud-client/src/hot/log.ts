/* eslint-disable no-console */

export const makeLogger = (options: Options) => {
  return {
    log: makeLog(options),
    error: makeError(options),
    warn: makeWarn(options),
    info: makeInfo(options),
  }
}

let lastLog: string = null
export const makeLog = options => {
  return (...args) => {
    if (options.log) {
      if (lastLog === args.join(``)) return
      lastLog = args.join(``)

      console.log(`[${options.name}]`, ...args)
    }
  }
}

export const makeInfo = options => {
  return (...args) => {
    if (options.log) {
      console.info(`[${options.name}]`, ...args)
    }
  }
}

export const makeError = options => {
  return (...args) => {
    console.error(`[${options.name}]`, ...args)
  }
}

export const makeWarn = options => {
  return (...args) => {
    console.warn(`[${options.name}]`, ...args)
  }
}
