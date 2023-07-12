import type {InstanceOptions} from 'modern-errors'

import ModernError from 'modern-errors'

/**
 * Props for Bud errors
 */
interface BudErrorProps {
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
  issues: URL
  message: string
  origin: BudErrorClass
  thrownBy: string
}

/**
 * Error base class
 */
class BudErrorClass extends ModernError {
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
   * Original error
   */
  public declare origin: BudErrorClass | false

  /**
   * Name of method that threw error
   */
  public declare thrownBy: false | string

  /**
   * Class constructor
   */
  public constructor(
    message: string,
    options?: InstanceOptions & {props?: Partial<BudErrorProps>},
  ) {
    super(message, options)

    this.thrownBy = options?.props?.thrownBy ?? false
    this.instance = options?.props?.instance ?? `default`
    this.origin = options?.props?.origin ?? false
    this.details = options?.props?.details ?? false
    this.issues = options?.props?.issues ?? false
    this.docs = options?.props?.docs ?? false

    this.isBudError = true
  }
}

/**
 * BudError
 */
const BudError = BudErrorClass.subclass(`BudError`, {
  custom: BudErrorClass,
})

/**
 * ModuleError
 */
const ModuleError = BudErrorClass.subclass(`ModuleError`, {
  custom: BudErrorClass,
})

/**
 * ConfigError
 */
const ConfigError = BudErrorClass.subclass(`ConfigurationError`, {
  custom: BudErrorClass,
})

/**
 * InputError
 */
const InputError = BudErrorClass.subclass(`InputError`, {
  custom: BudErrorClass,
})

/**
 * CompilerError
 */
const CompilerError = BudErrorClass.subclass(`CompilerError`, {
  custom: BudErrorClass,
})

/**
 * ServerError
 */
const ServerError = BudErrorClass.subclass(`ServerError`, {
  custom: BudErrorClass,
})

/**
 * ExtensionError
 */
const ExtensionError = BudErrorClass.subclass(`ExtensionError`, {
  custom: BudErrorClass,
})

export {
  BudError,
  BudErrorClass,
  CompilerError,
  ConfigError,
  ExtensionError,
  InputError,
  ModuleError,
  ServerError,
}
