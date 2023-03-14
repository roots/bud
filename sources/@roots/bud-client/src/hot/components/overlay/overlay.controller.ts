const ansiPattern = [
  `[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)`,
  `(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))`,
].join(`|`)

const stripAnsi = (body: string) =>
  body?.replace?.(new RegExp(ansiPattern, `g`), ``) ?? body

/**
 * Overlay controller
 */
export class Controller {
  /**
   * Element
   */
  public element: HTMLElement

  /**
   * HMR update
   */
  public payload: Payload

  /**
   * Formatted error message
   */
  public get message(): string {
    return this.payload.errors?.reduce((a, c) => {
      const msg = c?.message ?? c?.error ?? c
      if (!msg) return a
      return `${a}
        <div>
          <pre>${stripAnsi(msg)}</pre>
        </div>`
    }, ``)
  }

  /**
   * Class constructor
   */
  public constructor() {
    this.update = this.update.bind(this)
    this.element = document.createElement(`bud-error`)
  }

  /**
   * Append `bud-error` element to the DOM
   */
  public createError() {
    !document.body.querySelector(`bud-error`) &&
      document.body?.appendChild(this.element)
  }

  /**
   * Remove `bud-error` element from the DOM (if present)
   */
  public removeError() {
    document.body.querySelector(`bud-error`)?.remove()
  }

  /**
   * Update DOM
   */
  public update(payload: Payload): void {
    this.payload = payload

    this.element.setAttribute(`message`, this.message ?? ``)

    if (this.payload.errors?.length > 0) {
      return this.createError()
    }

    this.removeError()
  }
}
