import {platform} from 'node:os'

import type {Bud} from '@roots/bud-framework'
import {bind} from '@roots/bud-support/decorators'
import {isEmpty, isFunction, isString} from '@roots/bud-support/lodash-es'
import type {
  StatsCompilation,
  StatsError,
} from '@roots/bud-support/webpack'
import * as NodeNotifier from 'node-notifier'
import open from 'open'
import openEditor from 'open-editor'

import {notifierPath} from './notifierPath.js'

interface EditorError {
  file: string
  line: number
  column: number
}
interface Notification extends NodeNotifier.Notification {
  sound?: boolean | string | undefined
  subtitle?: string | undefined
  contentImage?: string | undefined
  open?: string | undefined
  timeout?: number | false | undefined
  closeLabel?: string | undefined
  actions?: string | string[] | undefined
  dropdownLabel?: string | undefined
  reply?: boolean | undefined
  group?: string
}

/**
 * Notifier
 *
 * @public
 */
export class Notifier {
  public bud: Bud

  public static notifier = new NodeNotifier.NotificationCenter({
    customPath: notifierPath,
  })

  public notify(
    notification: Notification,
    callback?: NodeNotifier.NotificationCallback,
  ) {
    Notifier.notifier.notify(notification, callback)
  }

  @bind
  public setBud(bud: Bud) {
    this.bud = bud
    return this
  }

  public editor: string | boolean
  public get autoOpenEditor(): boolean {
    return isString(this.editor)
  }
  @bind
  public setEditor(editor: string | boolean) {
    if (isString(editor)) {
      this.editor = editor
      return this
    }
    if (editor === true) {
      this.editor =
        this.bud.env.get(`VISUAL`) ?? this.bud.env.get(`EDITOR`)
      return this
    }

    this.editor = false
    return this
  }

  public browser: string | boolean
  public get autoOpenBrowser(): boolean {
    return this.browser === true || isString(this.browser)
  }
  @bind
  public setBrowser(name: string | boolean) {
    this.browser = name
    return this
  }

  public title: string
  @bind
  public setTitle(title: string): this {
    this.title = title
    return this
  }

  public group: string
  @bind
  public setGroup(group: string) {
    this.group = group
    return this
  }

  public message: string
  @bind
  public setMessage(message: string | (() => string)) {
    this.message = isFunction(message) ? message() : message
  }

  public url: string
  @bind
  public setUrl(url: string): this {
    this.url = url
    return this
  }

  @bind
  public async compilationNotification() {
    if (this.bud.context.args.notify === false) {
      this.bud.info(`notification center disabled. exiting.`)
      return
    }
    if (platform() !== `darwin`) {
      this.bud.info(`notifications only currently supported on macos`)
      return
    }
    this.bud.info(`notification center called`)

    this.setStats(
      isFunction(this.bud.compiler.stats?.toJson)
        ? this.bud.compiler.stats.toJson()
        : {},
    )
    this.setGroup(this.bud.path())
    this.setTitle(this.bud.label)
    this.setMessage(
      this.hasErrors
        ? `Compilation failed`
        : this.hasWarnings
        ? `Compilation succeeded (with warnings)`
        : `Successfully compiled`,
    )
    this.setEditor(this.bud.context.args.editor)
    this.setBrowser(this.bud.context.args.browser)
    this.setUrl(
      this.bud.hooks.filter(`dev.url`, new URL(`http://0.0.0.0:3000`))
        .origin,
    )

    try {
      const urlProps =
        this.bud.isDevelopment && this.url ? {open: this.url} : {}
      this.notify(
        {
          title: this.title,
          message: this.message,
          group: this.group,
          ...urlProps,
        },
        this.callback,
      )
    } catch (error) {}

    if (this.hasErrors && this.autoOpenEditor) {
      this.openEditor(this.parseErrors(this.stats.errors))
    }
    if (this.autoOpenBrowser) {
      try {
        await this.open(this.url)
      } catch (error) {}
    }
  }

  /**
   * Open browser in development
   *
   * @public
   */
  @bind
  public async open(url: string) {
    if (!this.bud.isDevelopment) return
    if (this.browser === false) return
    if (isString(url) === false) return

    if (isString(this.browser)) {
      return await open(url, {app: {name: this.browser}})
    }

    return await open(url)
  }

  /**
   * Open editor on error
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public openEditor(
    errors?: Array<{
      file: string
      line: number
      column: number
    }>,
  ) {
    if (!this.autoOpenEditor) return
    if (isEmpty(errors)) return
    if (!isString(this.editor)) return

    return openEditor(errors, {editor: this.editor})
  }

  /**
   * node notifier callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async callback(
    ...args: NodeNotifier.NotificationCallback[`arguments`]
  ): Promise<void> {
    const [_error, response, metadata] = args

    if (response) this.bud.info(`notify response`, response)
    if (metadata) this.bud.info(`notify metadata`, metadata)
  }

  public stats: StatsCompilation = {}
  @bind
  public setStats(stats: StatsCompilation): this {
    this.stats = stats
    return this
  }
  public get errors(): StatsCompilation[`errors`] {
    return [
      ...(this.stats?.errors ?? []),
      ...(this.stats?.children ?? []).map(c => c.errors).flat(),
    ].flat()
  }
  public get errorCount(): number {
    return this.errors.length
  }
  public get hasErrors(): boolean {
    return this.errorCount > 0
  }

  public get warnings(): StatsCompilation[`warnings`] {
    return [
      ...(this.stats?.warnings ?? []),
      ...(this.stats?.children ?? []).map(c => c.warnings).flat(),
    ].flat()
  }
  public get warningCount(): number {
    return this.warnings.length
  }
  public get hasWarnings(): boolean {
    return this.warningCount > 0
  }
  @bind
  public parseErrors(errors: Array<StatsError>): Array<EditorError> {
    if (!errors || !errors.length) return []

    try {
      const parseError = (error: StatsError): EditorError => {
        const file = (error?.moduleName ?? error?.message)
          .replace(this.bud.path(), `.`)
          .match(/\.\/(.+\.\w*)/)
          .shift()
        if (!file) return
        return {file: file, line: 0, column: 0}
      }

      return errors?.map(parseError).filter(Boolean)
    } catch (error) {
      this.bud.info(`error parsing errors`, error)
      return []
    }
  }
}
