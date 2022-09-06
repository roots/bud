import type {Bud} from '@roots/bud-framework'
import {bind, once} from 'helpful-decorators'
import {isString} from 'lodash-es'
import {
  Notification,
  NotificationCallback,
  NotificationCenter,
} from 'node-notifier'
import open from 'open'
import openEditor from 'open-editor'
import type {StatsCompilation, StatsError} from 'webpack'

import {notifierPath} from './notifierPath.js'

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
  public get jsonStats(): StatsCompilation {
    return this.app.compiler.stats?.toJson() ?? {}
  }

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public app: Bud) {
    this.notificationCenter = new NotificationCenter({
      customPath: notifierPath,
    })
  }

  /**
   * Notice title
   *
   * @public
   */
  public get title(): string {
    return this.group
  }

  /**
   * Notice group
   *
   * @public
   */
  public get group(): string {
    return this.app.label
  }

  /**
   * Notice message
   * @public
   */
  public get message() {
    return this.jsonStats?.errors?.length > 0
      ? `Compiled with errors`
      : `Compiled without errors`
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
    const parseError = (error: StatsError) => {
      const file = (error?.moduleName ?? error?.message)
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

    const parsedErrors: Array<{
      file: string
      line: number
      column: number
    }> = errors
      .map(parseError)
      .filter(Boolean)
      .reduce(
        (a, v) => (a.some(av => av.file === v.file) ? [...a] : [...a, v]),
        [],
      )

    if (parsedErrors?.length === 0) return
    openEditor(parsedErrors, {editor: this.editor})
  }

  /**
   * Notifications
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async notify() {
    this.app.info(`notification center called`)

    const errors = this.jsonStats.errors

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

    if (this.app.context.args.notify !== false) {
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
