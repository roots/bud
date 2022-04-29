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
    return this.app.compiler.stats.errorsCount > 0
      ? `✖ ${this.app.project.get('manifest.name') ?? this.app.name}`
      : `✔ ${this.app.project.get('manifest.name') ?? this.app.name}`
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
    return `\
${this.app.mode} build completed with ${this.app.compiler.stats.errorsCount} errors \
and ${this.app.compiler.stats.warningsCount} warnings`
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
    this.app.isDevelopment &&
      open(this.app.server.connection.url.toString())
  }

  /**
   * Open editor on error
   * @public
   * @decorator `@bind`
   */
  @bind
  public openEditor(
    errors: {file: string; line?: number | null; column?: number | null}[],
  ) {
    if (!this.editor) {
      return this.app.warn(
        `can't open in editor\n`,
        'the --openEditor flag was used but there is no editor indicated by either $EDITOR or $VISUAL environmental variables\n',
        '$VISUAL will be preferred over $EDITOR if both are present',
      )
    }

    this.app.info('opening editor', this.editor)

    openEditor(errors, {editor: this.editor})
  }

  public get editor() {
    if (this.app.env.has('VISUAL')) return this.app.env.get('VISUAL')
    if (this.app.env.get('EDITOR')) return this.app.env.get('EDITOR')
  }

  @bind
  public editorEvents() {
    if (!this.app.isProduction) return

    const parsed = (
      this.app.compiler.stats?.errors ??
      this.app.compiler.errors ??
      []
    )
      .map(error => {
        this.app.info(error)

        const [_group, line, column] =
          error.message?.match(/\((.*)\:(.*)\)/)

        if (
          error.moduleTrace &&
          Array.isArray(error.moduleTrace) &&
          error.moduleTrace.shift()?.originName
        ) {
          return {
            file: error.moduleTrace.shift().originName,
            column,
            line,
          }
        }

        if (error.moduleName) {
          return {
            file: this.app.path(error.moduleName as any),
            column,
            line,
          }
        }
      })
      .filter(({file}) => file)

    this.app.info(parsed)

    this.openEditor(parsed)
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
      this.app.context.args.openEditor && this.editorEvents()
    } catch (err) {
      this.app.warn(err)
    }

    try {
      this.app.context.args.openBrowser &&
        this.app.compiler.stats.errorsCount &&
        this.openBrowser()
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
