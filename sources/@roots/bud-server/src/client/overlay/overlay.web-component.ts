/**
 * Component container
 *
 * @public
 */
export class Component extends HTMLElement {
  public name: string = `bud-overlay`

  /**
   * `true` if component has been rendered
   *
   * @public
   */
  public rendered: boolean

  /**
   * WHM payload
   *
   * @public
   */
  public payload: any

  public get message() {
    return this.getAttribute('message')
  }

  /**
   * Render component
   *
   * @public
   */
  public render() {
    this.rendered = true
    this.classList.add(this.name)
  }

  public setInnerHtml(content: string) {
    this.innerHTML = `
    <style>
      .${this.name} {
        display: none;
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: scroll;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        transition: all 0.2s ease-in-out;
        justify-content: center;
      }
      .${this.name}__visible {
        backdrop-filter: blur(10px);
        border-top: 3px solid red;
        display: flex;
        align-items: center;
        align-content: center;
        flex-direction: column;
        transition: all 0.2s ease-in-out;
      }
      .${this.name}__visible > div {
        align-items: center;
        align-content: center;
        flex-direction: column;
        padding: 1rem;
      }
      .${this.name}__visible > div > * {
        display: inline-block;
        width: 100vw;
        padding: 1rem;
      }
      .${this.name}__visible > div > span {
        font-size: 1.5rem;
        font-weight: 500;
      }
      .${this.name}__visible > div > pre {
        font-size: 0.8rem;
        overflow-x: scroll;
      }
    </style>

    ${content}
  `
  }

  public static get observedAttributes() {
    return ['message']
  }

  public attributeChangedCallback() {
    if (this.getAttribute('message')) {
      !this.classList.contains(`${this.name}__visible`) &&
        this.classList.add(`${this.name}__visible`)

      return this.setInnerHtml(this.getAttribute('message'))
    }

    this.classList.contains(`${this.name}__visible`) &&
      this.classList.remove(`${this.name}__visible`)
  }

  public connectedCallback() {
    if (this.rendered) return

    this.render()
  }
}
