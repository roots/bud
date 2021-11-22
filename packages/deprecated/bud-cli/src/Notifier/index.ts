import {Framework} from '@roots/bud'
import {boundMethod as bind} from 'autobind-decorator'
import {NotificationCenter} from 'node-notifier'
import {resolve} from 'path'

const MACOS_NOTIFIER_PATH = resolve(
  __dirname,
  '../../vendor/roots-notifier.app/Contents/MacOS/roots-notifier',
)

export class Notifier {
  public notifier

  public constructor() {
    this.notifier = new NotificationCenter({
      customPath: MACOS_NOTIFIER_PATH,
    })
  }

  @bind
  public notify(app: Framework) {
    const name = app.discovery.getProjectInfo().name ?? app.name

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
