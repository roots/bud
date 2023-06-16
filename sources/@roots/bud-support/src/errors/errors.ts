/* eslint-disable n/no-process-env */
import type {InstanceOptions} from 'modern-errors'

import ModernError from 'modern-errors'

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
  origin: BudHandler
  thrownBy: string
}

const BudBaseError = ModernError.subclass(`BaseError`, {})

class BudHandler extends BudBaseError {
  public declare details: false | string
  public declare docs: false | URL
  public declare file: {
    module: any
    name: string
    path: string
    sha1: string
  }

  public declare instance: `default` | string
  public isBudError = true
  public declare issues: false | URL
  public declare origin: BudHandler | false
  public declare thrownBy: false | string

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

const BudError = BudBaseError.subclass(`BudError`, {
  custom: BudHandler,
})

const CLIError = BudBaseError.subclass(`CLIError`, {
  custom: BudHandler,
})

const ModuleError = BudBaseError.subclass(`ModuleError`, {
  custom: BudHandler,
})

const ConfigError = BudError.subclass(`ConfigurationError`, {
  props: {
    details: `Error processing a project configuration file`,
    docs: new URL(`https://bud.js.org`),
  },
})
const InputError = BudError.subclass(`InputError`, {
  props: {
    details: `Error stemming from user input`,
    docs: new URL(`https://bud.js.org`),
  },
})
const CompilerError = BudBaseError.subclass(`CompilerError`, {
  custom: BudHandler,
})
const ServerError = BudError.subclass(`ServerError`, {
  props: {
    details: `Error in the bud.js development server`,
    docs: new URL(`https://bud.js.org/docs/bud.serve`),
  },
})
const ExtensionError = BudError.subclass(`ExtensionError`, {
  props: {
    details: `Error in an extension`,
    docs: new URL(`https://bud.js.org`),
  },
})

export {
  BudError,
  BudHandler,
  CLIError,
  CompilerError,
  ConfigError,
  ExtensionError,
  InputError,
  ModuleError,
  ServerError,
}
