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

  public override get message(): string {
    return this.message
      .replaceAll(/\n/g, `\n\n`)
      .replaceAll(process.env.INIT_CWD as string, `$INIT_CWD`)
      .replaceAll(process.env.PROJECT_CWD as string, `$PROJECT_CWD`)
  }
}

const BudError = BudBaseError.subclass(`BudError`, {
  custom: BudHandler,
})

const ModuleError = BudError.subclass(`ModuleError`, {
  props: {
    details: `Error accessing, writing to, importing or resolving a module.`,
    issues: new URL(`https://github.com/roots/bud/issues`),
  },
})

const ImportError = ModuleError.subclass(`ImportError`)
const FileReadError = ModuleError.subclass(`FileReadError`, {
  props: {
    details: `Error reading from a file`,
    issues: new URL(`https://github.com/roots/bud/issues`),
  },
})
const FileWriteError = ModuleError.subclass(`FileWriteError`, {
  props: {
    details: `Error writing to a file`,
    issues: new URL(`https://github.com/roots/bud/issues`),
  },
})

const ConfigError = BudError.subclass(`ConfigError`, {
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
const CompilerError = BudError.subclass(`CompilerError`, {
  props: {
    details: `Error running the compiler instance.`,
    docs: new URL(`https://bud.js.org`),
    issues: new URL(`https://github.com/roots/bud/issues`),
  },
})
const ServerError = BudError.subclass(`ServerError`, {
  props: {
    details: `Error in the bud.js development server`,
    docs: new URL(`https://bud.js.org/docs/bud.serve`),
  },
})
const ExtensionError = BudError.subclass(`BudErrorError`, {
  props: {
    details: `Error in an extension`,
    docs: new URL(`https://bud.js.org`),
  },
})

export {
  BudError,
  BudHandler,
  CompilerError,
  ConfigError,
  ExtensionError,
  FileReadError,
  FileWriteError,
  ImportError,
  InputError,
  ModuleError,
  ServerError,
}
