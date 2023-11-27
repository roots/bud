import isObject from '@roots/bud-support/lodash/isObject'

const cwd = `${global.process.cwd()}`

const clean = (message?: string) => {
  return message
    ?.replace(new RegExp(cwd, `g`), `.`)
    .replace(/\s+/g, ` `)
    .replace(/file:\/\//g, ``)
}

interface BudErrorProps {
  details?: string
  docs?: URL
  file?: {
    module?: any
    name?: string
    path?: string
    sha1?: string
  }
  instance?: string
  issue?: URL
  origin?: BudError | Error
  thrownBy?: string | URL
}

/**
 * Error base class
 */
class BudError extends Error {
  /**
   * Details
   */
  public declare details?: BudErrorProps[`details`]

  /**
   * Documentation URL
   */
  public declare docs?: BudErrorProps[`docs`]

  /**
   * Information about file related to error
   */
  public declare file?: BudErrorProps[`file`]

  /**
   * Instance name containing error
   */
  public declare instance?: BudErrorProps[`instance`]

  /**
   * Issue tracker URL
   */
  public declare issue?: BudErrorProps[`issue`]

  /**
   * Original error
   */
  public declare origin?: BudErrorProps[`origin`]

  /**
   * Name of method that threw error
   */
  public declare thrownBy?: BudErrorProps[`thrownBy`]

  /**
   * Is BudError
   */
  public isBudError = true

  /**
   * Normalize error
   */
  public static normalize(
    source: unknown,
    options: BudErrorProps = {},
  ): BudError {
    if (source instanceof BudError) {
      Object.entries(options).map(([key, value]) => {
        source[key as keyof BudErrorProps] = value
      })
      return source
    }

    if (source instanceof Error) {
      return new BudError(source.message, options)
    }

    if (typeof source === `string`) {
      return new BudError(source, options)
    }

    return new BudError(`An unknown error occured`, options)
  }

  /**
   * Class constructor
   */
  public constructor(message: string, options: BudErrorProps = {}) {
    super(message)

    this.isBudError = true

    this.name = this.constructor.name
    this.message = (clean(message) ?? message)?.replace(/.*Error:/g, ``)

    if (options.details) {
      this.details = clean(options.details)
    }

    if (options.docs) {
      this.docs = options.docs
    }

    if (options.file) {
      this.file = {
        ...options.file,
        path: clean(options.file.path),
      }
    }

    if (options.instance) {
      this.instance = options.instance
    }

    if (options.issue) {
      this.issue = options.issue
    }

    if (options.origin) {
      this.origin =
        isObject(options.origin) && `isBudError` in options.origin
          ? options.origin
          : BudError.normalize(options.origin)
    }

    if (options.thrownBy) {
      this.thrownBy =
        options.thrownBy instanceof URL
          ? options.thrownBy.toString()
          : options.thrownBy
    }

    if (this.stack) {
      this.stack = this.stack
        .split(`\n`)
        .filter((line, i) => i > 0 && !line.includes(`bud-support`))
        .map(clean)
        .filter(Boolean)
        .join(`\n`)
    }
  }
}

class ModuleError extends BudError {}

class ConfigError extends BudError {}

class InputError extends BudError {}

class CompilerError extends BudError {}

class ServerError extends BudError {}

class ExtensionError extends BudError {}

export {
  BudError,
  CompilerError,
  ConfigError,
  ExtensionError,
  InputError,
  ModuleError,
  ServerError,
}
