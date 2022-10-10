import {bind} from '@roots/bud-support/decorators'
import patchConsole from '@roots/bud-support/patch-console'

import {Service} from '../service.js'

export default class ConsoleBuffer extends Service {
  public static label = `consoleBuffer`

  public messages: {stdout: string[]; stderr: string[]} = {
    stdout: [],
    stderr: [],
  }

  public restore: () => any

  @bind
  public async boot() {
    if (this.app.context?.args?.ci) return

    this.restore = patchConsole((stream, data) => {
      const message = data.trim()

      if (!message || message.length === 0) return
      if (this.messages[stream].some(message => message === data)) return

      this.app.logger
        .makeInstance({
          disabled: this.app.context.args?.log === false,
          config: {displayLabel: false},
          logLevel: `info`,
        })
        .scope(...this.app.logger.scope, stream)
        [stream === `stdout` ? `log` : `error`](message)
    })

    this.app.hooks.action(`compiler.close`, this.restore)
  }
}
