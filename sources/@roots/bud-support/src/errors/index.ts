const cwd = global.process.cwd()

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
    path: string
  }
  instance?: string
  issue?: URL
  name: string
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
  public declare file?: string

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
   * Name of error
   */
  public declare name: BudErrorProps[`name`]

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
    source: BudError | Error | string,
    options: Partial<BudErrorProps> = {},
  ): BudError {
    if (typeof source === `string`) {
      return new BudError(source, options)
    }

    if (source instanceof BudError) {
      return source
    }

    if (source instanceof Error) {
      return new BudError(source.message, options)
    }

    return new BudError(`An unknown error has occured`, options)
  }

  /**
   * Class constructor
   */
  public constructor(
    message: string,
    options: Partial<BudErrorProps> = {},
  ) {
    super(message)

    this.isBudError = true

    this.name = options.name ?? this.constructor.name
    this.message =
      this.message ?? (clean(message) ?? message)?.replace(/.*Error:/g, ``)

    this.details = this.details ?? clean(options.details)
    this.docs = this.docs ?? options.docs
    this.instance = this.instance ?? options.instance
    this.issue = this.issue ?? options.issue

    if (options.file) {
      this.file = clean(options.file.path)
    }

    if (options.origin) {
      const innerMessage =
        options.origin?.message ?? options.origin ?? null

      if (innerMessage)
        this.origin =
          options.origin instanceof BudError
            ? options.origin
            : new BudError(innerMessage)
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

export {BudError}
export {render} from './render/index.js'
