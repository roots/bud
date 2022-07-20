import type {Bud} from '@roots/bud-framework'
import {bind, once} from 'helpful-decorators'
import {join} from 'node:path'
import {
  Notification,
  NotificationCallback,
  NotificationCenter,
} from 'node-notifier'
import open from 'open'
import openEditor from 'open-editor'

/**
 * Notification center
 *
 * @public
 */
interface NotificationCenter {
  notify(
    notification?: Notification,
    callback?: NotificationCallback,
  ): NotificationCenter
}

/**
 * Notifier
 *
 * @public
 */
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
   * Get user editor from env
   *
   * @public
   */
  public get editor() {
    if (this.app.env.has('VISUAL')) return this.app.env.get('VISUAL')
    if (this.app.env.get('EDITOR')) return this.app.env.get('EDITOR')
  }

  /**
   * compilation stats accessor
   *
   * @public
   */
  public get jsonStats() {
    return this.app.compiler.stats?.toJson() ?? {}
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
   *
   * @public
   */
  public get title(): string {
    return this.app.compiler.stats?.toJson()?.errors?.length > 0
      ? `✖ ${this.group}`
      : `✔ ${this.group}`
  }

  /**
   * Notice group
   *
   * @public
   */
  public get group(): string {
    return this.app.name ?? this.app.context.application.name
  }

  /**
   * Notice message
   * @public
   */
  public get message() {
    return [
      `${this.app.mode} build completed`,
      (this.jsonStats.errors?.length || this.jsonStats.warnings?.length) &&
        `with`,
      this.jsonStats.errors?.length &&
        `${this.jsonStats.errors.length} errors`,

      this.jsonStats.errors?.length &&
        this.jsonStats.warnings?.length &&
        `and`,

      this.jsonStats.warnings?.length &&
        `${this.jsonStats.warnings.length} warnings`,
    ]
      .filter(Boolean)
      .join(' ')
  }

  /**
   * Open URL
   *
   * @public
   */
  public get open(): string {
    if (this.app.isProduction) return
    return this.app.server.connection.url.toString()
  }

  /**
   * Open browser in development
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async openBrowser() {
    if (this.app.isProduction) return
    return await open(this.open)
  }

  /**
   * Open editor on error
   *
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

  /**
   * Notifications
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async notify() {
    this.app.info('cli', 'notify')

    try {
      if (this.jsonStats.errors?.length && this.app.context.args.editor)
        this.openEditor(this.jsonStats.errors)
    } catch (err) {
      this.app.warn(err)
    }

    try {
      if (this.app.context.args.browser && !this.jsonStats.errors?.length)
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
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async callback(error: Error, response: any, metadata: any) {}
}
