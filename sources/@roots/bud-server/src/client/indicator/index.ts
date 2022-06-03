export const make = async (): Promise<{update: (data) => void}> => {
  const {Controller} = await import('./indicator.controller.js')
  const {Component} = await import('./indicator.component.js')

  if (customElements.get('bud-activity-indicator')) return

  customElements.define('bud-activity-indicator', Component)

  return new Controller()
}
