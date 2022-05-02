import {Bud} from '@roots/bud-framework'
import {bind, open, openEditor} from '@roots/bud-support'
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
  public constructor(public app: Bud) {
    this.notificationCenter = new NotificationCenter({
      customPath: this.binary,
    })
  }

  /**
   * Notice title
   * @public
   */
  public get title(): string {
    return this.app.compiler.errors?.length > 0
      ? `✖ ${
          this.app.context.manifest.name ??
          this.app.context.application.name ??
          this.app.name
        }`
      : `✔ ${
          this.app.context.manifest.name ??
          this.app.context.application.name ??
          this.app.name
        }`
  }

  /**
   * Notice group
   * @public
   */
  public get group(): string {
    return this.app.context.manifest.name
  }

  /**
   * Notice message
   * @public
   */
  public get message() {
    return [
      `${this.app.mode} build completed`,
      this.app.compiler.errors?.length || this.app.compiler.warnings.length
        ? `with`
        : ``,
      this.app.compiler.errors?.length
        ? `${this.app.compiler.errors.length} errors`
        : null,
      this.app.compiler.errors?.length && this.app.compiler.warnings.length
        ? `and`
        : ``,
      this.app.compiler.warnings?.length
        ? `${this.app.compiler.warnings.length} warnings`
        : null,
    ]
      .filter(Boolean)
      .join(' ')
  }

  /**
   * Open URL
   * @public
   */
  public get open(): string {
    if (this.app.isProduction) return
    return this.app.server.connection.url.toString()
  }

  /**
   * Open browser in development
   * @public
   * @decorator `@bind`
   */
  @bind
  public async openBrowser() {
    if (this.app.isProduction) return
    return await open(this.open)
  }

  /**
   * Open editor on error
   * @public
   * @decorator `@bind`
   */
  @bind
  public openEditor(
    errors: Array<{
      file?: string
      line?: number
      column?: number
      message: string
    }>,
  ) {
    if (!this.editor) {
      return this.app.warn(
        `Can't open problem file(s) in editor\n`,
        `The --editor flag was used but there is no editor indicated by either $EDITOR or $VISUAL environmental variables\n`,
        '$VISUAL will be preferred over $EDITOR if both are present',
      )
    }

    openEditor(
      errors.map(error => {
        if (!error.file) return
        return {
          file: this.app.path(error.file as `./`),
          line: error.line ?? 0,
          column: error.column ?? 0,
        }
      }),
      {editor: this.editor},
    )
  }

  public get editor() {
    if (this.app.env.has('VISUAL')) return this.app.env.get('VISUAL')
    if (this.app.env.get('EDITOR')) return this.app.env.get('EDITOR')
  }

  @bind
  public async editorEvents() {
    this.openEditor(this.app.compiler.errors)
  }

  /**
   * OS level affairs
   * @public
   * @decorator `@bind`
   * @decorator `@debounce`
   */
  @bind
  public async notify() {
    this.app.info('cli', 'notify')

    try {
      if (this.app.compiler.errors.length && this.app.context.args.editor)
        await this.editorEvents()
    } catch (err) {
      this.app.warn(err)
    }

    try {
      if (
        this.app.context.args.browser &&
        !this.app.compiler.errors.length
      )
        await this.openBrowser()
    } catch (err) {
      this.app.warn(err)
    }

    try {
      this.app.context.args.notify &&
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
    } catch (err) {
      this.app.warn(err)
    }
  }

  /**
   * node notifier callback
   * @public
   * @decorator `@bind`
   */
  @bind
  public async callback(error: Error, response: any, metadata: any) {}
}
