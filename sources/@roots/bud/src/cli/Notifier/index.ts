import {resolve} from 'path'
import {Stats} from 'webpack'

import {Bud} from '../../Bud'
import {NodeNotifier} from '../cli.dependencies'

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

  public notify(app: Bud, _props?: Stats) {
    const group = app.name

    const title =
      app.compiler.stats?.errorsCount &&
      app.compiler.stats?.errorsCount > 0
        ? `Build error`
        : `Build success`

    const message =
      app.compiler.stats?.errorsCount &&
      app.compiler.stats?.errorsCount > 0
        ? `${group} couldn't be compiled`
        : `${group} compiled successfully`

    this.instance.notify({
      title,
      message,
      group,
      contentImage: resolve(__dirname, '../../../../assets/bud-icon.jpg'),
    })
  }
}
