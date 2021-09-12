import Base from '@oclif/command'

import {Notifier} from './Notifier'

/**
 * Base command class
 *
 * @internal
 */
export abstract class Command extends Base {
  /**
   * Command description
   */
  public static description: typeof Base.description =
    'A bud command'

  /**
   * {@link Notifier} instance
   */
  public notifier: Notifier

  /**
   * Initializes command
   *
   * @returns void
   */
  public async init() {
    this.notifier = new Notifier()
  }
}
