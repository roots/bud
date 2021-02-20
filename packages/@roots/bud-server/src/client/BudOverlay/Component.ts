export class Component extends HTMLElement {
  public rendered: boolean

  static get observedAttributes() {
    return ['type']
  }

  public render() {
    const wrapperStyles = `
      backdrop-filter: blur(10px);
      position: absolute;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      align-content: center;
      max-height: 100%;
      max-width: 100%;
      flex-wrap: wrap;
      display: flex;
      flex-direction: column;
      transition: all 0.2s ease-in-out;
    `

    this.innerHTML = `
      <div style="${wrapperStyles}">
        <bud-inner>
          <bud-message>
            ${this.innerHTML}
          </bud-message>
        </bud-inner>
      </div>
    `

    this.style.position = `absolute`
    this.style.top = `0`
    this.style.left = `0`
    this.style.right = `0`
    this.style.bottom = `0`

    this.style.display = `flex`
    this.style.flexWrap = `flex-wrap`
    this.style.flexDirection = `column`
    this.style.justifyItems = `center`
    this.style.alignItems = `center`
    this.style.overflow = `hidden`
  }

  public connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }
}
