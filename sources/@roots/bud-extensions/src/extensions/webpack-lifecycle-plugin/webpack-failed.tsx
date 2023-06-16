import type {WebpackError} from '@roots/bud-framework/types/config'

import {Error} from '@roots/bud-dashboard/app'
import {Extension} from '@roots/bud-framework/extension'
import {bind} from '@roots/bud-support/decorators/bind'
import {BudError, type BudHandler} from '@roots/bud-support/errors'
import {render} from '@roots/bud-support/ink'

/**
 * Webpack done
 */
export class WebpackFailedHandler extends Extension {
  /**
   * Webpack done callback
   */
  @bind
  public onFailed(error: Error & Partial<WebpackError> & {error?: Error}) {
    global.process.exitCode = 1

    this.app.isDevelopment &&
      this.app.server.appliedMiddleware?.hot?.publish({error})

    const {message, name} = error

    const moduleNotFoundError = name === `ModuleNotFoundError`

    error.name = name
    error.message = message

    if (moduleNotFoundError) {
      if (
        error.message.includes(
          `Error: Can't resolve 'index' in '${this.app.path(`@src`)}'`,
        )
      ) {
        error.message = error.message.replace(
          `Module not found: Error: Can't resolve 'index' in '${this.app.path(
            `@src`,
          )}'`,
          `Either create a file at ${this.app.relPath(
            `@src/index.js`,
          )} or specify the path to your entry file with bud.entry`,
        )
        return error
      }
    }

    this.app.notifier.notify({
      group: this.app.label,
      message: error.message,
      subtitle: error.name,
    })

    if (`isBudError` in error) {
      render(<Error error={error as unknown as BudHandler} />)
    } else {
      render(<Error error={BudError.normalize(error)} />)
    }

    return error
  }
}
