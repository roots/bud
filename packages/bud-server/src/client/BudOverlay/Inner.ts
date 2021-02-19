export class Inner extends HTMLElement {
  public rendered: boolean

  static get observedAttributes() {
    return ['label']
  }

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

  public connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }

  public attributeChangedCallback() {
    this.render()
  }
}
