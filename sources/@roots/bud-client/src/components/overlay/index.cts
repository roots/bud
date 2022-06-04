import {Component} from './overlay.component.cjs'
import {Controller} from './overlay.controller.cjs'

export const make = async (): Promise<{update: (data) => void}> => {
  if (customElements.get('bud-error')) return

  customElements.define('bud-error', Component)

  return new Controller()
}
