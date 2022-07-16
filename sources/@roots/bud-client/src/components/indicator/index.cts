import {Component} from './indicator.component.cjs'
import {Controller} from './indicator.controller.cjs'

export const make = async (): Promise<{update: (data) => void}> => {
  if (customElements.get(`bud-activity-indicator`)) return

  customElements.define(`bud-activity-indicator`, Component)

  return new Controller()
}
