import {Notifier as NodeNotifier} from '@roots/bud-support'
import {resolve} from 'path'

import {Bud} from '../../Bud'

/**
 * MacOS binary
 */
const MACOS_NOTIFIER_PATH = resolve(
  __dirname,
  '../../../vendor/roots-notifier.app/Contents/MacOS/roots-notifier',
)

export class Notifier {
  public instance: {
    notify(props: {
      title: string
      message: string
      group: string
      contentImage: string
    }): unknown
  }

  public constructor() {
    this.instance = new NodeNotifier.NotificationCenter({
      customPath: MACOS_NOTIFIER_PATH,
    })

    this.notify = this.notify.bind(this)
  }

  public notify(app: Bud, props) {
    const group = app.project.getProjectInfo().name ?? app.name

    const title =
      props?.title || app.compiler.stats.errors.length > 0
        ? `Build error`
        : `Build success`

    const message =
      props?.message || app.compiler.stats.errors.length > 0
        ? `${group} couldn't be compiled`
        : `${group} compiled successfully`

    this.instance.notify({
      title,
      message,
      group,
      contentImage: resolve(__dirname, '../assets/bud-icon.jpg'),
    })
  }
}
