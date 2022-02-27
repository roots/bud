import {Framework} from '@roots/bud-framework'
import {chalk} from '@roots/bud-support'

/**
 * @internal
 */
export interface facade {
  (...args: any[]): Framework
}

/**
 * @internal
 */
export interface factory {
  (name: string): facade
}

/**
 * @internal
 */
export const factory: factory = (name: string): facade =>
  function facade(...args: any[]): Framework {
    this.api.queue.push([name, args])

    this.log({
      message: `facade added to queue: ${chalk.cyan(name)}`,
      suffix: this.json.stringify(args),
    })

    return this
  }
