export class Component extends HTMLElement {
  public rendered: boolean

  public static get observedAttributes() {
    return ['type']
  }

  public render() {
    this.innerHTML = `
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
          display: flex;
          align-items: center;
          align-content: center;
          max-height: 100%;
          max-width: 100%;
          flex-wrap: wrap;
          display: flex;
          flex-direction: column;
          transition: all 0.2s ease-in-out;
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

  public connectedCallback() {
    if (!this.rendered) {
      this.render()
      this.rendered = true
    }
  }
}
