/**
 * Component container
 */
export class Component extends HTMLElement {
  public name: string = `bud-overlay`

  /**
   * WHM payload
   */
  public payload: any

  public documentBodyStyle: any

  public get message() {
    return this.getAttribute(`message`)
  }

  public constructor() {
    super()
    this.renderShadow()
  }

  public renderShadow(): void {
    const container = document.createElement(`div`)
    container.classList.add(`overlay`)
    container.innerHTML = `
      <style>
        .overlay {
          width: 100vw;
          backdrop-filter: blur(10px);
          display: flex;
          height: 100vh;
          border-top: 2px solid transparent;
          overflow-x: hidden;
          overflow-y: scroll;
          position: absolute;
          top: -1000px;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          transition: opacity 0.2s ease-in-out, border 0.4s ease-in-out;
          justify-content: center;
        }

        .visible {
          position: fixed;
          top: 0;
          z-index: 9998;
          opacity: 1;
          border-top: 5px solid red;
          transition: opacity 0.2s ease-in-out, border 0.4s ease-in-out;
          max-width: 100vw;
        }

        .messages {
          background-color: white;
          border-radius: 5px;
          filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
          display: flex;
          align-self: center;
          width: 800px;
          max-width: 90vw;
          margin-left: auto;
          margin-right: auto;
          flex-direction: column;
          flex-wrap: wrap;
          align-items: center;
          align-content: center;
          padding: 2rem 2rem 0rem 2rem;
        }

        .visible .messages > div {
          position: relative;
          top: 0;
          opacity: 1;
          transition: all: 0.2s ease-in-out;
        }

        .messages > div {
          position: relative;
          top: 20px;
          opacity: 0;
          transition: all: 0.2s ease-in-out;
          align-items: center;
          align-content: center;
          color: rgba(0, 0, 0, 0.87);
          flex-direction: column;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
          padding: 0rem 2rem 2rem 2rem;
          width: 100%;
          max-width:95vw;
        }

        .messages > div > pre {
          font-weight: 300;
          font-size: 0.8rem;
          overflow-x: scroll;
        }

        pre {
          background: #303030;
          color: #f1f1f1;
          padding: 10px 16px;
          border-radius: 2px;
          border-top: 4px solid #dd0303;
          -moz-box-shadow: inset 0 0 10px #000;
          box-shadow: inset 0 0 10px #000;
          counter-reset: line;
        }

        pre span {
          display: block;
          line-height: 1.5rem;
        }

        pre span:before {
          counter-increment: line;
          content: counter(line);
          display: inline-block;
          border-right: 1px solid #ddd;
          padding: 0 .5em;
          margin-right: .5em;
          color: #888;
          width: 30px;
        }
      </style>
      <div class="messages"></div>
    `

    this.attachShadow({mode: `open`}).appendChild(container)
  }

  public static get observedAttributes() {
    return [`message`]
  }

  public attributeChangedCallback() {
    if (!this.documentBodyStyle)
      this.documentBodyStyle = document.body?.style

    if (this.getAttribute(`message`)) {
      document.body.style.overflow = `hidden`

      this.shadowRoot.querySelector(`.overlay`).classList.add(`visible`)

      this.shadowRoot.querySelector(`.messages`).innerHTML =
        this.getAttribute(`message`)

      return
    }

    if (this.documentBodyStyle?.overflow && document?.body?.style) {
      document.body.style.overflow = this.documentBodyStyle.overflow
    }

    this.shadowRoot.querySelector(`.overlay`).classList.remove(`visible`)
  }

  public connectedCallback() {
    if (document.body?.style) this.documentBodyStyle = document.body.style
  }
}
