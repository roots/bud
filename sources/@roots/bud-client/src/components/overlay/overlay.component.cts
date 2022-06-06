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

  public documentBodyStyle: any

  public get message() {
    return this.getAttribute('message')
  }

  /**
   * Render component
   *
   * @public
   */
  public render(): void {
    this.rendered = true
    this.classList.add(this.name)
  }

  public setInnerHtml(content: string): void {
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
        background: rgba(255, 255, 255, 0.75);
        border-top: 3px solid red;
        display: flex;
        align-items: center;
        align-content: center;
        flex-direction: column;
        transition: all 0.2s ease-in-out;
      }
      .${this.name} > div {
        align-items: center;
        align-content: center;
        flex-direction: column;
        padding: 1rem;
      }
      .${this.name} > div > * {
        display: inline-block;
        width: 100vw;
        padding: 1rem;
      }
      .${this.name} > div > span {
        font-size: 1.5rem;
        font-weight: 500;
      }
      .${this.name} > div > pre {
        font-size: 0.8rem;
        overflow-x: scroll;
      }
    </style>
    ${content ?? ''}
  `
  }

  public static get observedAttributes() {
    return ['message']
  }

  public attributeChangedCallback() {
    if (document.body?.style) this.documentBodyStyle = document.body.style

    if (this.getAttribute('message')) {
      document.body.style.overflow = 'hidden'

      !this.classList.contains(`${this.name}__visible`) &&
        this.classList.add(`${this.name}__visible`)

      return this.setInnerHtml(this.getAttribute('message'))
    }

    if (this.documentBodyStyle?.overflow) {
      document.body.style.overflow = this.documentBodyStyle.overflow
    }

    this.classList.contains(`${this.name}__visible`) &&
      this.classList.remove(`${this.name}__visible`)
  }

  public connectedCallback() {
    if (document.body?.style) this.documentBodyStyle = document.body.style

    if (this.rendered) return

    this.render()
  }
}
