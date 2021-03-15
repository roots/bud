import {Indicator} from './Indicator'

const activity = {
  node: null,

  payload: null,

  init() {
    customElements.define('bud-activity-indicator', Indicator)

    this.node = document.createElement('bud-activity-indicator')

    document.body && document.body.appendChild(this.node)

    return this
  },

  update() {
    const complete = this.payload.action == 'built'
    const pending = this.payload.action == 'building'
    const hasWarnings = this.payload?.warnings?.length > 0
    const hasErrors = this.payload?.errors?.length > 0

    this.node.setAttribute('action', this.payload?.action)
    this.node.setAttribute('has-warnings', hasWarnings)
    this.node.setAttribute('has-errors', hasErrors)

    hasWarnings &&
      console.warn('[Bud] Warning', this.payload.warnings)

    hasErrors &&
      console.error('[Bud] Error', this.payload.errors)

    pending && console.log('[Bud] Compiling...')

    complete &&
      !hasErrors &&
      !hasWarnings &&
      console.log(
        `[Bud] Compilation success [${this.payload.hash}] (${this.payload.time}ms)`,
      )

    if (this.payload.action == 'reload') {
      console.log(
        `[Bud] Project template modified. Reloading now.`,
      )

      setTimeout(window.location.reload, 1000)
    }
  },
}

export const indicator = activity
