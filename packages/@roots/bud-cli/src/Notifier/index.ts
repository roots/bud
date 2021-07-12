import {Framework} from '@roots/bud'
import {resolve} from 'path'
import {boundMethod as bind} from 'autobind-decorator'
import {NotificationCenter} from 'node-notifier'

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
    this.notifier.notify({
      title:
        app.compiler.stats.errors.length > 0
          ? `Build error`
          : `Build success`,
      message:
        app.compiler.stats.errors.length > 0
          ? `${
              app.discovery.getProjectInfo().name ?? app.name
            } couldn't be compiled`
          : `${
              app.discovery.getProjectInfo().name ?? app.name
            } compiled successfully`,
      group: app.discovery.getProjectInfo().name ?? app.name,
      contentImage: resolve(__dirname, '../assets/bud-icon.jpg'),
    })
  }
}
