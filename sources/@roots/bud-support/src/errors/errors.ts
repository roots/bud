/* eslint-disable n/no-process-env */
import ModernError, {InstanceOptions} from 'modern-errors'

interface BudErrorProps {
  isBudError: true
  details: string
  issues: URL
  instance: string
  thrownBy: string
  docs: URL
  origin: BudHandler
  file: {
    name: string
    path: string
    sha1: string
    module: any
  }
}

const BudBaseError = ModernError.subclass(`BaseError`, {})

class BudHandler extends BudBaseError {
  public declare thrownBy: string | false
  public declare instance: string | `default`
  public declare file: {
    name: string
    path: string
    sha1: string
    module: any
  }
  public declare origin: BudHandler | false
  public declare details: string | false
  public declare docs: URL | false
  public declare issues: URL | false
  public isBudError = true

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
  BudHandler,
  BudError,
  ModuleError,
  ImportError,
  ExtensionError,
  FileReadError,
  FileWriteError,
  InputError,
  ServerError,
  CompilerError,
  ConfigError,
}
