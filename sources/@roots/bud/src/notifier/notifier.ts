import type {Bud} from '@roots/bud-framework'
import {bind, once} from '@roots/bud-support/decorators'
import {isFunction, isNumber, isString} from '@roots/bud-support/lodash-es'
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
    return isFunction(this.app.compiler.stats?.toJson)
      ? this.app.compiler.stats.toJson()
      : {}
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
    const totalErrorCount =
      this.jsonStats.errorsCount +
      this.jsonStats.children.reduce(
        (a, c) => (isNumber(c.errorsCount) ? a + c.errorsCount : a),
        0,
      )
    const hasErrors = totalErrorCount > 0

    const totalWarningCount =
      this.jsonStats.warningsCount +
      this.jsonStats.children.reduce(
        (a, c) => (isNumber(c.warningsCount) ? a + c.warningsCount : a),
        0,
      )

    const hasWarnings = totalWarningCount > 0

    return hasErrors
      ? `Compiled with errors`
      : hasWarnings
      ? `Compiled with warnings`
      : `Compiled without errors`
  }

  /**
   * Open URL
   *
   * @public
   */
  public get open(): string {
    return this.app.isDevelopment
      ? this.app.hooks
          .filter(`dev.url`)
          .origin.replace(`0.0.0.0`, `localhost`)
      : null
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
   * Open browser in development
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public async openBrowser() {
    const {browser: name} = this.app.context.args
    return await open(
      this.open,
      isString(name) ? {app: {name}} : undefined,
    )
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

    if (this.app.context.args.notify !== false) {
      this.notificationCenter.notify(
        {
          title: this.title,
          message: this.message,
          // @ts-ignore
          group: this.group,
          open: this.app.isDevelopment ? this.open : undefined,
        },
        this.callback,
      )
    }

    try {
      if (this.app.context.args.editor)
        this.openEditor([
          ...this.jsonStats.errors,
          ...this.jsonStats.children
            ?.map(child => child.errors)
            .reduce((a, c) => [...a, ...(c ?? [])], []),
        ])
    } catch (err) {
      this.app.warn(err)
    }

    try {
      if (this.app.context.args.browser) await this.openBrowser()
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
