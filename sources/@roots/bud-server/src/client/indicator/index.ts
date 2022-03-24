export const make = async (): Promise<{update: (data) => void}> => {
  const {Controller} = await import('./indicator.controller')
  const {Component} = await import('./indicator.component')

  if (customElements.get('bud-activity-indicator')) return

  customElements.define('bud-activity-indicator', Component)

  return new Controller()
}
