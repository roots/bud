import {Framework} from '@roots/bud-framework'
import {bind, debounce, open, openEditor} from '@roots/bud-support'
import {
  Notification,
  NotificationCallback,
  NotificationCenter,
} from 'node-notifier'
import {join} from 'path'

interface NotificationCenter {
  notify(
    notification?: Notification,
    callback?: NotificationCallback,
  ): NotificationCenter
}

export class Notifier {
  /**
   * Node notifier notification center
   *
   * @public
   */
  public notificationCenter: NotificationCenter

  /**
   * Binary path
   *
   * @public
   */
  public get binary() {
    return join(
      this.app.context.application.dir,
      'vendor',
      'mac.no-index',
      'roots-notifier.app',
      'Contents',
      'MacOS',
      'roots-notifier',
    )
  }

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public app: Framework) {
    this.notificationCenter = new NotificationCenter({
      customPath: this.binary,
    })
  }

  public get title(): string {
    return this.app.compiler.stats.errorsCount > 0
      ? `✖ ${this.app.project.get('manifest.name') ?? this.app.name}`
      : `✔ ${this.app.project.get('manifest.name') ?? this.app.name}`
  }

  public get group(): string {
    return this.app.context.manifest.name
  }

  public get message() {
    return `\
${this.app.mode} build completed with ${this.app.compiler.stats.errorsCount} errors \
and ${this.app.compiler.stats.warningsCount} warnings`
  }

  public get open(): string {
    if (this.app.isProduction) return
    return this.app.server.connection.url.toString()
  }

  @bind
  public openEditor() {
    this.app.isDevelopment &&
      this.app.context.args.openEditor == true &&
      this.app.compiler.stats?.errors?.length &&
      this.app.compiler.stats.errors[0].moduleTrace?.length &&
      this.app.compiler.stats.errors[0].moduleTrace[0].originName &&
      openEditor(
        this.app.compiler.stats.errors[0].moduleTrace
          .filter(({originName}) => originName)
          .map(({originName}) => ({
            file: this.app.path(originName),
          })),
      )
  }

  @bind
  public async openBrowser() {
    if (
      this.app.isDevelopment &&
      this.app.context.args.openBrowser == true &&
      this.app.compiler.stats.errorsCount == 0
    )
      await open(this.app.server.connection.url.toString())
  }

  /**
   * Emits notification
   * @public
   * @decorator `@bind`
   * @decorator `@debounce`
   */
  @bind
  @debounce(1000)
  public async notify() {
    this.openEditor()
    await this.openBrowser()

    this.app.context.args.notify === true &&
      this.notificationCenter.notify(
        {
          title: this.title,
          message: this.message,
          // @ts-ignore
          group: this.group,
          open: this.open,
        },
        this.callback,
      )
  }

  /**
   * node notifier callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async callback(error: Error, response: any, metadata: any) {}
}
