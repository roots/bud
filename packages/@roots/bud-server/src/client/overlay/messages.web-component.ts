/**
 * Error message
 *
 * @remarks
 * sub-component of the ErrorOverlay component.
 *
 * @public
 */
export class Message extends HTMLElement {
  /**
   * True if component has rendered
   *
   * @public
   */
  public rendered: boolean

  /**
   * Inner HTML
   *
   * @public
   */
  public innerHTML: string = ''

  /**
   * Style props
   *
   * @public
   */
  public style: CSSStyleDeclaration

  /**
   * Render component
   *
   * @public
   */
  public render(): void {
    this.innerHTML = `
      <span>
        <code>${this.innerHTML}</code>
      </span>
    `

    this.style.maxWidth = `60%`
    this.style.maxHeight = `60%`
    this.style.overflowY = `scroll`
    this.style.padding = `0.5rem`

    this.style.borderTop = `2px solid rgba(220, 38, 38, 1)`
    this.style.color = `rgba(31, 41, 55, 1)`
    this.style.background = `rgba(255, 255, 255, 1)`
    this.style.overflowX = `scroll`
    this.style.fontSize = `0.6rem`
    this.style.borderRadius = `8px`
    this.style.boxShadow = `
      0 6px 10px 0 rgba(0,0,0,0.14),
      0 1px 18px 0 rgba(0,0,0,0.12),
      0 3px 5px -1px rgba(0,0,0,0.20)
    `
    this.style.transition = `all 0.2s ease-in-out`
    this.style.transitionDelay = `0.15s`
  }

  /**
   * Component reactivity handler
   *
   * @public
   */
  public connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }
}
