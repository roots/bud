import {Notifier as NodeNotifier} from '@roots/bud-support'
import {resolve} from 'path'

import Bud from '../../Bud'

/**
 * MacOS binary
 */
const MACOS_NOTIFIER_PATH = resolve(
  __dirname,
  '../../../vendor/roots-notifier.app/Contents/MacOS/roots-notifier',
)

/**
 * Notifier class
 *
 * @internal
 */
export class Notifier {
  /**
   * Node notifier instance
   */
  public notifier: {
    notify(props: {
      title: string
      message: string
      group: string
      contentImage: string
    }): unknown
  }

  /**
   * Class notification
   */
  public constructor() {
    this.notifier = new NodeNotifier.NotificationCenter({
      customPath: MACOS_NOTIFIER_PATH,
    })

    this.notify = this.notify.bind(this)
  }

  /**
   * Make with the notifcation
   *
   * @param app - {@link Bud} instance
   */
  public notify(app: Bud) {
    const name = app.project.getProjectInfo().name ?? app.name

    this.notifier.notify({
      title:
        app.compiler.stats.errors.length > 0
          ? `Build error`
          : `Build success`,
      message:
        app.compiler.stats.errors.length > 0
          ? `${name} couldn't be compiled`
          : `${name} compiled successfully`,
      group: name,
      contentImage: resolve(__dirname, '../assets/bud-icon.jpg'),
    })
  }
}
