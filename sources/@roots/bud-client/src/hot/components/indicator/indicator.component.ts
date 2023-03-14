import {pulse} from './indicator.pulse.js'

/**
 * Indicator web component
 */
export class Component extends HTMLElement {
  /**
   * Has component rendered
   */
  public rendered: boolean

  /**
   * Component name
   */
  public name: string = `bud-activity-indicator`

  /**
   * Root div querySelector selector
   */
  public get selector() {
    return `.${this.name}`
  }

  /**
   * Timer
   */
  public hideTimeout: NodeJS.Timer

  /**
   * Get accessor: has errors
   */
  public get hasErrors(): boolean {
    return this.getAttribute(`has-errors`) == `true`
  }

  /**
   * Get accessor: has warnings
   */
  public get hasWarnings(): boolean {
    return this.getAttribute(`has-warnings`) == `true`
  }

  /**
   * Status indicator colors
   */
  public colors: Record<string, [number, number, number, number]> = {
    success: [4, 120, 87, 1],
    error: [220, 38, 38, 1],
    warn: [252, 211, 77, 1],
    pending: [59, 130, 246, 1],
  }

  /**
   * Class constructor
   */
  public constructor() {
    super()
    this.renderShadow()
  }

  /**
   * Render status indicator
   */
  public renderShadow() {
    const container = document.createElement(`div`)
    container.classList.add(this.name)
    container.innerHTML = `
    <style>
    .bud-activity-indicator {
      position: fixed;
      width: 10px;
      height: 10px;
      left: 10px;
      bottom: 10px;
      z-index: 9999;
      margin: 5px;
      padding: 5px;
      -webkit-transition:
        all .6s ease-in-out,
      transition:
        all .6s ease-in-out;
      animation-fill-mode: forwards;
      pointer-events: none;
      border-radius: 50%;
      transform: scale(0);
      opacity: 0;
    }

    .show {
      opacity: 1;
      background-color: rgba(255, 255, 255, 1);
      transform: scale(1);
      transition:
        all .6s ease-in-out;
    }

    ${pulse(`success`, this.colors.success)}
    ${pulse(`error`, this.colors.error)}
    ${pulse(`warning`, this.colors.warn)}
    ${pulse(`pending`, this.colors.pending)}

    </style>
    `

    this.attachShadow({mode: `open`}).appendChild(container)
  }

  /**
   * Show status indicator
   */
  public show() {
    this.hideTimeout && clearTimeout(this.hideTimeout)
    this.shadowRoot.querySelector(this.selector).classList.add(`show`)
  }

  /**
   * Hide status indicator
   */
  public hide() {
    this.hideTimeout = setTimeout(() => {
      this.shadowRoot.querySelector(this.selector).classList.remove(`show`)
    }, 2000)
  }

  /**
   * Status is pending
   */
  public onPending() {
    this.show()

    this.shadowRoot
      .querySelector(this.selector)
      .classList.remove(`error`, `warning`, `success`)

    this.shadowRoot.querySelector(this.selector).classList.add(`pending`)

    this.hide()
  }

  /**
   * Status is success
   */
  public onSuccess() {
    this.show()

    this.shadowRoot
      .querySelector(this.selector)
      .classList.remove(`error`, `warning`, `pending`)

    this.shadowRoot.querySelector(this.selector).classList.add(`success`)

    this.hide()
  }

  /**
   * Status is error
   */
  public onError() {
    this.show()

    this.shadowRoot
      .querySelector(this.selector)
      .classList.remove(`warning`, `success`, `pending`)
    this.shadowRoot.querySelector(this.selector).classList.add(`error`)
  }

  /**
   * Status is warning
   */
  public onWarning() {
    this.show()

    this.shadowRoot
      .querySelector(this.selector)
      .classList.remove(`error`, `success`, `pending`)

    this.shadowRoot.querySelector(this.selector).classList.add(`warning`)
  }

  public static get observedAttributes() {
    return [`has-errors`, `has-warnings`, `action`]
  }

  public attributeChangedCallback() {
    if (this.hasAttribute(`has-errors`)) return this.onError()
    if (this.hasAttribute(`has-warnings`)) return this.onWarning()

    if (
      !this.hasAttribute(`has-errors`) &&
      !this.hasAttribute(`has-warnings`) &&
      this.getAttribute(`action`) === `built`
    )
      return this.onSuccess()

    if (
      this.getAttribute(`action`) == `building` ||
      this.getAttribute(`action`) == `sync`
    )
      return this.onPending()
  }
}
