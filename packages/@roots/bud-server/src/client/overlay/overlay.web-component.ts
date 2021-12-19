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
   * Inner HTML
   *
   * @public
   */
  public innerHTML: string = ''

  /**
   * Get accessor: has warnings
   *
   * @public
   */
  public get hash(): string {
    return this.getAttribute('hash')
  }

  public constructor() {
    super()
    this.render = this.render.bind(this)
    this.clear = this.clear.bind(this)
    this.error = this.error.bind(this)
    this.connectedCallback = this.connectedCallback.bind(this)
    this.attributeChangedCallback =
      this.attributeChangedCallback.bind(this)
  }

  /**
   * @public
   */
  public render() {
    this.innerHTML = ` \
<style>
  #bud-overlay__component {
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
    display: flex;
  }
</style>

<div id="bud-overlay__component">
  <bud-inner>
    <bud-message>
      ${this.innerHTML}
    </bud-message>
  </bud-inner>
</div>
    `
  }

  /**
   * Update status
   *
   * @public
   */
  public update() {
    if (
      !this.payload?.errors?.length &&
      !this.payload?.warnings?.length &&
      this.payload.action == 'built'
    ) {
      this.clear()
      return
    }

    this.error()
  }

  public clear() {
    this.innerHTML = ''
    this.classList.remove('bud-overlay__component_visible')
  }

  public error() {
    this.innerHTML = this.payload.errors.reduce(
      (all: string, current: string) => [
        ...all,
        current.trimStart().trimEnd(),
      ],
      [],
    )

    this.classList.add('bud-overlay__component_visible')
  }

  public static get observedAttributes() {
    return ['id']
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
