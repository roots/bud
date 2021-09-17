/**
 * CSS animation for reload indicator
 *
 * @public
 */
const makePulse = (name: string, color: number[]): string => `
  .${name} {
    transform: scale(1);
    background: rgba(${color[0]}, ${color[1]}, ${color[2]}, 1);
    box-shadow: 0 0 0 0 rgba(${color[0]}, ${color[1]}, ${color[2]}, 1);
    animation: ${name}__pulse 2s infinite;
  }

  @keyframes ${name}__pulse {
    0% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.7);
    }

    70% {
      transform: scale(1);
      box-shadow: 0 0 0 10px rgba(${color[0]}, ${color[1]}, ${color[2]}, 0);
    }

    100% {
      transform: scale(0.95);
      box-shadow: 0 0 0 0 rgba(${color[0]}, ${color[1]}, ${color[2]}, 0);
    }
  }
`

/**
 * Indicator web component
 *
 * @public
 */
export class Indicator extends HTMLElement {
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
      !this.hasErrors &&
      !this.hasWarnings &&
      this.getAttribute('action') == 'building'
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
    pending: [255, 255, 255],
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

      ${makePulse(`${this.name}__success`, this.colors.success)}
      ${makePulse(`${this.name}__error`, this.colors.error)}
      ${makePulse(`${this.name}__warning`, this.colors.warn)}
      ${makePulse(`${this.name}__pending`, this.colors.pending)}

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

    this.hide()
  }

  /**
   * Update status
   *
   * @public
   */
  public update() {
    if (this.isPending) this.pending()
    else if (this.hasErrors) this.error()
    else if (this.hasWarnings) this.warning()

    !this.isPending &&
      !this.hasErrors &&
      !this.hasWarnings &&
      this.success()
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
