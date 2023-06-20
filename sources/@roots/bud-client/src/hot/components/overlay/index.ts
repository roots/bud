import {Component} from './overlay.component.js'
import {Controller} from './overlay.controller.js'

export const make = (): {
  update: (data: Payload) => void
} => {
  if (customElements.get(`bud-error`)) return

  customElements.define(`bud-error`, Component)

  return new Controller()
}
