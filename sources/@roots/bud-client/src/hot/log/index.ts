/* eslint-disable no-console */

export const makeLogger = (options: Options) => {
  return {
    error: makeError(options),
    info: makeInfo(options),
    log: makeLog(options),
    warn: makeWarn(options),
  }
}

export const makeLog = (options: Options) => {
  return (...args: Array<unknown>) => {
    if (options.log) {
      console.log(`[${options.name}]`, ...args)
    }
  }
}

export const makeInfo = (options: Options) => {
  return (...args: Array<unknown>) => {
    if (options.log) {
      console.info(`[${options.name}]`, ...args)
    }
  }
}

export const makeError = (options: Options) => {
  return (...args: Array<unknown>) => {
    console.error(`[${options.name}]`, ...args)
  }
}

export const makeWarn = (options: Options) => {
  return (...args: Array<unknown>) => {
    console.warn(`[${options.name}]`, ...args)
  }
}
