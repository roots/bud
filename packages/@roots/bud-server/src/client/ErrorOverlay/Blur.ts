export class Blur extends HTMLElement {
  public rendered: boolean

  public render() {
    this.style.width = `100%`
    this.style.height = `100%`
    this.style.maxWidth = `100%`
    this.style.maxHeight = `100%`
    this.style.position = `absolute`
    this.style.top = `0`
    this.style.left = `0`
    this.style.right = `0`
    this.style.bottom = `0`
    this.style.backgroundColor = `#FFF`
    this.style.opacity = `0.7`
    this.style.filter = `saturate(0)`
  }

  public connectedCallback() {
    if (!this.rendered) {
      this.render()

      this.rendered = true
    }
  }
}
