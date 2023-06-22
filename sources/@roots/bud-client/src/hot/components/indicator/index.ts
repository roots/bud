import {Component} from './indicator.component.js'
import {Controller} from './indicator.controller.js'

export const make = () => {
  if (customElements.get(`bud-activity-indicator`)) return
  customElements.define(`bud-activity-indicator`, Component)

  return new Controller()
}
