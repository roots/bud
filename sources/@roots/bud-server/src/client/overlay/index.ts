export const make = async (): Promise<{update: (data) => void}> => {
  const {Controller} = await import('./overlay.controller')
  const {Component} = await import('./overlay.component')

  if (customElements.get('bud-error')) return

  customElements.define('bud-error', Component)

  return new Controller()
}
