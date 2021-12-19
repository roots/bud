import {pulse} from './pulse.component'

/**
 * Indicator web component
 *
 * @public
 */
export class IndicatorComponent extends HTMLElement {
  /**
   * Has component rendered
   *
   * @public
   */
  public rendered: boolean

  /**
   * Component name
   *
   * @public
   */
  public name: string = `bud-activity-indicator`

  /**
   * Timer
   *
   * @public
   */
  public hideTimeout: NodeJS.Timer

  /**
   * hmr status payload
   */
  public payload: any

  /**
   * Get accessor: has errors
   *
   * @public
   */
  public get hasErrors(): boolean {
    return this.getAttribute('has-errors') == 'true'
  }

  /**
   * Get accessor: has warnings
   *
   * @public
   */
  public get hasWarnings(): boolean {
    return this.getAttribute('has-warnings') == 'true'
  }

  /**
   * Compilation is ongoing
   *
   * @public
   */
  public get isPending(): boolean {
    return (
      !this.payload?.errors?.length &&
      !this.payload?.warnings?.length &&
      this.payload?.action == 'building'
    )
  }

  /**
   * Status indicator colors
   *
   * @public
   */
  public colors = {
    success: [4, 120, 87],
    error: [220, 38, 38],
    warn: [252, 211, 77],
    pending: [59, 130, 246],
  }

  /**
   * Render status indicator
   *
   * @public
   */
  public render() {
    this.classList.add(this.name)

    this.innerHTML = `
    <style>
      .${this.name} {
        position: fixed;
        width: 10px;
        height: 10px;
        left: 10px;
        bottom: 10px;
        z-index: 9998;
        margin: 10px;
        padding: 5px;
        transition: opacity ease 1500ms;
        pointer-events: none;
        border-radius: 50%;
      }

      ${pulse(`${this.name}__success`, this.colors.success)}
      ${pulse(`${this.name}__error`, this.colors.error)}
      ${pulse(`${this.name}__warning`, this.colors.warn)}
      ${pulse(`${this.name}__pending`, this.colors.pending)}

      .${this.name}__visible {
        opacity: 1;
      }

      .${this.name}__hidden {
        opacity: 0;
      }
    </style>
    `
  }

  /**
   * Show status indicator
   *
   * @public
   */
  public show() {
    clearTimeout(this.hideTimeout)

    this.classList.remove(`${this.name}__hidden`)
  }

  /**
   * Hide status indicator
   */
  public hide() {
    this.hideTimeout = setTimeout(() => {
      this.classList.remove(
        `${this.name}__error`,
        `${this.name}__warning`,
        `${this.name}__success`,
        `${this.name}__pending`,
      )
      this.classList.add(`${this.name}__hidden`)
    }, 2000)
  }

  /**
   * Status is pending
   *
   * @public
   */
  public pending() {
    this.show()

    this.classList.remove(
      `${this.name}__error`,
      `${this.name}__warning`,
      `${this.name}__success`,
    )

    this.classList.add(`${this.name}__pending`)

    this.hide()
  }

  /**
   * Status is success
   *
   * @public
   */
  public success() {
    this.show()

    this.classList.remove(
      `${this.name}__error`,
      `${this.name}__warning`,
      `${this.name}__pending`,
    )

    this.classList.add(`${this.name}__success`)

    this.hide()
  }

  /**
   * Status is error
   *
   * @public
   */
  public error() {
    this.show()

    this.classList.remove(
      `${this.name}__warning`,
      `${this.name}__success`,
      `${this.name}__pending`,
    )

    this.classList.add(`${this.name}__error`)
  }

  /**
   * Status is warning
   *
   * @public
   */
  public warning() {
    this.show()

    this.classList.remove(
      `${this.name}__error`,
      `${this.name}__success`,
      `${this.name}__pending`,
    )

    this.classList.add(`${this.name}__warning`)
  }

  /**
   * Update status
   *
   * @public
   */
  public update() {
    if (
      !this.payload?.errors?.length &&
      !this.payload?.warnings?.length &&
      this.payload.action == 'built'
    ) {
      this.success()
      return
    }

    if (
      this.payload?.action == 'building' ||
      this.payload?.action == 'sync'
    ) {
      this.pending()
      return
    }

    if (this.payload?.errors?.length) {
      this.error()
      return
    }

    if (this.payload?.warnings?.length) {
      this.warning()
      return
    }
  }

  public static get observedAttributes() {
    return ['has-errors', 'has-warnings', 'action']
  }

  public attributeChangedCallback() {
    this.update()
  }

  public connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }
}
