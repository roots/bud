/**
 * Component container
 *
 * @public
 */
export class Component extends HTMLElement {
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

  /**
   * Get accessor: has warnings
   *
   * @public
   */
  public get hash(): string {
    return this.getAttribute('hash')
  }

  /**
   * @public
   */
  public render() {
    this.classList.add(`bud-overlay__component`)

    this.innerHTML = ` \
    <style>
      .bud-overlay__component {
        backdrop-filter: blur(10px);
        position: absolute;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        align-items: center;
        align-content: center;
        max-height: 100%;
        max-width: 100%;
        flex-wrap: wrap;
        display: none;
        flex-direction: column;
        transition: all 0.2s ease-in-out;
      }

      .bud-overlay__component_visible {
        display: inline-flex;
      }
    </style>

    <div>
      ${this.payload.errors.reduce(
        (all: string, current: string) =>
          `${all}<span><code>${current}</code></span>`,
        '',
      )}
    </div>
  `
  }

  public update() {
    if (!this.payload?.errors?.length) {
      return this.clear()
    }

    this.error()
  }

  public clear() {
    this.classList.remove('bud-overlay__component_visible')
  }

  public error() {
    this.classList.add('bud-overlay__component_visible')
  }

  public static get observedAttributes() {
    return ['hash']
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
