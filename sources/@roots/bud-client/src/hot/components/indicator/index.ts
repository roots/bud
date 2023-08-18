import {Component} from './component.js'
import {Controller} from './controller.js'

export const make = () => {
  if (customElements.get(`bud-activity-indicator`)) return
  customElements.define(`bud-activity-indicator`, Component)

  return new Controller()
}
