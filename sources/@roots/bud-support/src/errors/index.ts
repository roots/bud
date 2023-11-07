import {join} from 'node:path'

import args from '@roots/bud-support/utilities/args'
import cleanStack from 'clean-stack'

const cwd =
  global.process.env.PROJECT_CWD ??
  global.process.env.INIT_CWD ??
  global.process.cwd()

const basePath = args?.basedir
  ? join(cwd, args.basedir)
  : global.process.env.BUD_BASEDIR
  ? join(cwd, global.process.env.BUD_BASEDIR)
  : cwd

/**
 * Props for Bud errors
 */
interface BudErrorProps extends Error {
  details: string
  docs: URL
  file: {
    module: any
    name: string
    path: string
    sha1: string
  }
  instance: string
  isBudError: true
  issue: URL
  message: string
  origin: BudError | Error | string
  thrownBy: string
}

/**
 * Error base class
 */
class BudError extends Error {
  /**
   * Normalize error
   */
  public static normalize(error: unknown) {
    if (error instanceof BudError) return error

    if (error instanceof Error) {
      const {message, ...rest} = error
      return new BudError(message, rest)
    }

    if (typeof error === `string`) {
      return new BudError(error)
    }

    return new BudError(`unknown error`)
  }
  /**
   * Details
   */
  public declare details: false | string

  /**
   * Documentation URL
   */
  public declare docs: false | URL
  /**
   * Information about file related to error
   */
  public declare file: {
    module: any
    name: string
    path: string
    sha1: string
  }

  /**
   * Instance name containing error
   */
  public declare instance: `default` | string

  /**
   * Used to identify Bud errors
   */
  public isBudError = true

  /**
   * Issue tracker URL
   */
  public declare issues: false | URL

  /**
   * Error display name
   */
  public override name = `BudError`

  /**
   * Original error
   */
  public declare origin: BudError | Error | string

  /**
   * Name of method that threw error
   */
  public declare thrownBy: false | string

  /**
   * Class constructor
   */
  public constructor(
    message: string,
    options: Partial<BudErrorProps> = {},
  ) {
    super(message)

    Object.assign(this, options)
    Object.assign(this, message)

    if (!this.instance) this.instance = `default`

    if (this.message) {
      this.message = this.message
        .replaceAll(/file:\/\//g, ``)
        .replaceAll(new RegExp(basePath, `g`), ``)
    }

    if (this.stack) {
      this.stack = cleanStack(this.stack, {
        basePath,
        pathFilter: path =>
          !path.includes(`react-reconciler`) &&
          !path.includes(`bud-support/lib/errors`),
        pretty: true,
      }).replaceAll(/file:\/\//g, ``)
    }

    if (this.message) {
      this.message = cleanStack(this.message, {
        basePath,
        pathFilter: path =>
          !path.includes(`react-reconciler`) &&
          !path.includes(`bud-support/lib/errors`),
        pretty: true,
      }).replaceAll(/file:\/\//g, ``)
    }

    if (this.thrownBy) {
      this.thrownBy = this.thrownBy
        .replace(new RegExp(basePath, `g`), ``)
        .replaceAll(/file:\/\//g, ``)
    }

    if (this.file) {
      this.file.path = this.file.path
        .replaceAll(new RegExp(basePath, `g`), ``)
        .replaceAll(/file:\/\//g, ``)
    }
  }
}

/**
 * ModuleError
 */
class ModuleError extends BudError {
  public override name = `ModuleError`
}

/**
 * ConfigError
 */
class ConfigError extends BudError {
  public override name = `ConfigurationError`
}

/**
 * InputError
 */
class InputError extends BudError {
  public override name = `InputError`
}

/**
 * CompilerError
 */
class CompilerError extends BudError {
  public override name = `CompilerError`
}

/**
 * ServerError
 */
class ServerError extends BudError {
  public override name = `ServerError`
}

/**
 * ExtensionError
 */
class ExtensionError extends BudError {
  public override name = `ExtensionError`
}

export {
  BudError,
  CompilerError,
  ConfigError,
  ExtensionError,
  InputError,
  ModuleError,
  ServerError,
}
