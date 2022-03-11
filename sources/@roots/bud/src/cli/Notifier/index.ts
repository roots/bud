import {Framework} from '@roots/bud-framework'
import {bind} from '@roots/bud-support'
import NotificationCenter from 'node-notifier/notifiers/notificationcenter'
import {resolve} from 'path'

export class Notifier {
  /**
   * MacOS Notifier binary
   *
   * @public
   */
  public binary = resolve(
    __dirname,
    '../../../../vendor/roots-notifier.app/Contents/MacOS/roots-notifier',
  )

  /**
   * Node notifier notification center
   *
   * @public
   */
  public notificationCenter: NotificationCenter

  /**
   * Class constructor
   *
   * @public
   */
  public constructor() {
    this.notificationCenter = new NotificationCenter({
      customPath: this.binary,
    })
  }

  public getGroup(app: Framework): string {
    return app.path('project').split('/').pop()
  }

  /**
   * Emits notification
   *
   * @param app - Framework
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async notify(app: Framework) {
    this.notificationCenter.notify(
      {
        title:
          app.compiler.stats.errorsCount > 0
            ? `✖ ${app.project.get('manifest.name') ?? app.name}`
            : `✔ ${app.project.get('manifest.name') ?? app.name}`,
        message: `${app.mode} build completed with ${app.compiler.stats.errorsCount} errors and ${app.compiler.stats.warningsCount} warnings`,
        // @ts-ignore
        group: this.getGroup(app),
        ...(app.isDevelopment
          ? {open: app.server.connection.url.toString()}
          : {}),
      },
      this.makeCallback(app),
    )
  }

  /**
   * node notifier callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public makeCallback(app: Framework) {
    return (error: Error, response: any, metadata: any) => {
      //  error && app.error(error.toString())
    }
  }
}
