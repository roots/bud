import type {Bud} from '@roots/bud-framework'
import {bind, debounce, once} from 'helpful-decorators'
import {isString} from 'lodash-es'
import {join} from 'node:path/posix'
import {
  Notification,
  NotificationCallback,
  NotificationCenter,
} from 'node-notifier'
import open from 'open'
import openEditor from 'open-editor'
import type {MultiStats} from 'webpack'

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
      this.app.context.bud.basedir,
      `vendor`,
      `mac.no-index`,
      `roots-notifier.app`,
      `Contents`,
      `MacOS`,
      `roots-notifier`,
    )
  }

  /**
   * Get user editor from env
   *
   * @public
   */
  public get editor() {
    if (this.app.env.has(`VISUAL`)) return this.app.env.get(`VISUAL`)
    if (this.app.env.get(`EDITOR`)) return this.app.env.get(`EDITOR`)
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
    return this.app.label ?? this.app.context.bud.label
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
      .join(` `)
  }

  /**
   * Open URL
   *
   * @public
   */
  public get open(): string {
    return this.app.hooks.filter(`dev.url`).origin
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
    return await open(this.open, {
      app: isString(this.app.context.args.browser)
        ? {name: this.app.context.args.browser}
        : undefined,
    })
  }

  /**
   * Open editor on error
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public openEditor(errors: Array<any>) {
    if (!this.editor) {
      return this.app.error(
        `Can't open problem file(s) in editor\n`,
        `The --editor flag was used but there is no editor indicated by either $EDITOR or $VISUAL environmental variables\n`,
        `$VISUAL will be preferred over $EDITOR if both are present`,
      )
    }

    /* Webpack error messages are rough stuff */
    const parseError = error => {
      const file =
        error.moduleName ??
        error.message
          .replace(this.app.path(), `.`)
          .match(/\.\/(.+\.\w*)/)
          .shift()

      if (!file) return

      const column = error.message
        ?.match(/:\d+/)
        ?.shift()
        ?.replace(`:`, ``)

      const line = error.message?.match(/\d+\:/)?.shift()?.replace(`:`, ``)

      return {
        file: this.app.path(file),
        line: isString(line) ? Number.parseInt(line) : 0,
        column: isString(column) ? Number.parseInt(column) : 0,
      }
    }

    const parsedErrors = errors
      .map(parseError)
      .filter(Boolean)
      .reduce(
        (a, v) => (a.some(av => av.file === v.file) ? [...a] : [...a, v]),
        [],
      )

    if (parsedErrors.length === 0) return
    openEditor(parsedErrors, {editor: this.editor})
  }

  /**
   * Notifications
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  @debounce(1000)
  public async notify(stats: MultiStats) {
    const errors = stats.toJson().errors

    this.app.info(`cli`, `notify`)

    try {
      if (errors?.length && this.app.context.args.editor)
        this.openEditor(errors)
    } catch (err) {
      this.app.warn(err)
    }

    try {
      if (this.app.context.args.browser && !errors?.length)
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
