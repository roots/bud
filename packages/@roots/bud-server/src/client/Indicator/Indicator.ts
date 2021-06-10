const makePulse = (name, color) => `
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

export class Indicator extends HTMLElement {
  public rendered: boolean

  public name = `bud-activity-indicator`

  public hideTimeout

  public get hasErrors() {
    return this.getAttribute('has-errors') == 'true'
  }

  public get hasWarnings() {
    return this.getAttribute('has-warnings') == 'true'
  }

  public get isPending() {
    return (
      !this.hasErrors &&
      !this.hasWarnings &&
      this.getAttribute('action') == 'building'
    )
  }

  public colors = {
    success: [4, 120, 87],
    error: [220, 38, 38],
    warn: [252, 211, 77],
    pending: [255, 255, 255],
  }

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

  public show() {
    clearTimeout(this.hideTimeout)

    this.classList.remove(`${this.name}__hidden`)
  }

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

  public error() {
    this.show()

    this.classList.remove(
      `${this.name}__warning`,
      `${this.name}__success`,
      `${this.name}__pending`,
    )

    this.classList.add(`${this.name}__error`)
  }

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
