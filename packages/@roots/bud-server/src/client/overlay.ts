import * as Overlay from './BudOverlay'

customElements.define('bud-overlay', Overlay.Component)
customElements.define('bud-inner', Overlay.Inner)
customElements.define('bud-message', Overlay.Message)

const targetNode = document.createElement('div')

export const clientOverlay = {
  showProblems: (type, lines) => {
    targetNode.innerHTML = `
      <bud-overlay>
          ${lines.reduce(
            (all: string, current: string) => `
              ${all}${current.trimStart().trimEnd()}
            `,
            ``,
          )}
      </bud-overlay>
    `

    document.body &&
      (() => {
        document.body.appendChild(targetNode)
      })()
  },
  clear: () => {
    document.body &&
      targetNode.parentNode &&
      document.body.removeChild(targetNode)
  },
}
