export class Inner extends HTMLElement {
  /**
   * Has been rendered
   *
   * @public
   */
  public rendered: boolean

  /**
   * Inner HTML
   *
   * @public
   */
  public innerHTML: string = ``

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
  public render() {
    this.innerHTML = `
      ${this.innerHTML}
    `

    this.style.position = `relative`
    this.style.display = `flex`
    this.style.flexWrap = `flex-wrap`
    this.style.flexDirection = `column`
    this.style.alignContent = `center`
    this.style.justifyContent = `center`
    this.style.alignItems = `center`
    this.style.justifyItems = `center`

    this.style.padding = `0.5rem`
    this.style.margin = `1rem`

    this.style.height = `100%`
    this.style.width = `100%`
    this.style.maxWidth = `100%`
    this.style.maxHeight = `100%`
  }

  /**
   * Connected callback
   *
   * @public
   */
  public connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }

  /**
   * Attribute changed callback
   *
   * @public
   */
  public attributeChangedCallback() {
    this.render()
  }
}
