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
    const logger = this.app.logger.makeInstance({
      disabled: this.app.context.args?.log === false,
      config: {
        displayLabel: false,
        displayBadge: false,
        displayScope: false,
      },
      logLevel: `info`,
    })

    this.restore = patchConsole((stream, data) => {
      const message = data.trim()

      if (!message || message.length === 0) return
      if (this.messages[stream].some(message => message === data)) return

      logger[stream === `stdout` ? `log` : `error`](
        this.app.logger.format({
          message: message.replace(`${this.app.label}:\n`, ``),
        }),
      )
    })

    this.app.hooks.action(`compiler.close`, this.restore)
  }
}
