import stripAnsi from 'strip-ansi'

/**
 * Overlay controller
 * @public
 */
export class Controller {
  /**
   * Element
   * @public
   */
  public element: HTMLElement

  /**
   * HMR update
   * @public
   */
  public payload: Payload

  /**
   * Formatted error message
   * @public
   */
  public get message(): string {
    return this.payload.errors?.reduce(
      (a, c) => `${a}
        <div>
          <span>${c?.title ?? 'Compilation error'}</span>
          <pre>${stripAnsi(c?.message) ?? ''}</pre>
        </div>`,
      ``,
    )
  }

  /**
   * Class constructor
   *
   * @public
   */
  public constructor() {
    this.update = this.update.bind(this)
    this.element = document.createElement('bud-error')
  }

  /**
   * Append `bud-error` element to the DOM
   *
   * @public
   */
  public createError() {
    !document.body.querySelector('bud-error') &&
      document.body?.appendChild(this.element)
  }

  /**
   * Remove `bud-error` element from the DOM (if present)
   *
   * @public
   */
  public removeError() {
    document.body.querySelector('bud-error')?.remove()
  }

  /**
   * Update DOM
   *
   * @public
   */
  public update(payload: Payload): void {
    this.payload = payload
    this.element.setAttribute('message', this.message ?? ``)

    if (this.payload.errors?.length) {
      return this.createError()
    }

    this.removeError()
  }
}
