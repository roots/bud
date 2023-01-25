import {platform} from 'node:os'

import type {Bud} from '@roots/bud-framework'
import type {CommandContext} from '@roots/bud-framework/options'
import {bind} from '@roots/bud-support/decorators'
import isEmpty from '@roots/bud-support/lodash/isEmpty'
import isFunction from '@roots/bud-support/lodash/isFunction'
import isString from '@roots/bud-support/lodash/isString'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import {
  Notification as NodeNotification,
  NotificationCallback,
  NotificationCenter,
} from '@roots/bud-support/node-notifier'
import {open, openEditor} from '@roots/bud-support/open'
import type {
  StatsCompilation,
  StatsError,
} from '@roots/bud-support/webpack'

import {notifierPath} from './notifierPath.js'

interface SourceFile {
  file: string
  line?: number
  column?: number
}

interface Notification extends NodeNotification {
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
 */
export class Notifier {
  public bud: Bud & {context: CommandContext}
  public browser: string | boolean
  public stats?: StatsCompilation | undefined
  public url: string
  public message: string
  public group: string
  public title: string
  public editor: string | boolean
  public notifier = new NotificationCenter({customPath: notifierPath})

  /**
   * Track if browser has already been opened once
   * to prevent multiple browser tabs from opening
   * when changes are saved.
   *
   * When {@link Notifier.openBrowser} is called and this
   * prop is true the call exits early. Otherwise, the
   * browser is opened and this prop is set to true.
   *
   * @see {@link https://github.com/roots/bud/issues/2041}
   */
  public browserOpened = false

  public get notificationsEnabled(): boolean {
    return this.bud?.context.args.notify !== false
  }

  public get openEditorEnabled(): boolean {
    return isString(this.editor)
  }

  public get openBrowserEnabled(): boolean {
    return this.browser === true || isString(this.browser)
  }

  @bind
  public setBrowser(name: string | boolean) {
    this.browser = name
    return this
  }

  @bind
  public setTitle(title: string): this {
    this.title = title
    return this
  }

  @bind
  public setGroup(group: string) {
    this.group = group
    return this
  }

  @bind
  public setMessage(message: string | (() => string)) {
    this.message = isFunction(message) ? message() : message
  }

  @bind
  public setUrl(url: string): this {
    this.url = url
    return this
  }

  @bind
  public setBud(bud: Bud & {context: CommandContext}) {
    this.bud = bud
    return this
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

  @bind
  public setStats(stats: StatsCompilation): this {
    this.stats = stats
    return this
  }

  @bind
  public hasStats(): boolean {
    return !isEmpty(this.stats) || !isUndefined(this.stats)
  }

  @bind
  public hasErrors(): boolean {
    if (!this.hasStats()) return false
    return this.getErrorCount() > 0
  }

  @bind
  public hasWarnings(): boolean {
    if (!this.hasStats()) return false
    return this.getWarningCount() > 0
  }

  @bind
  public getErrors(): StatsCompilation[`errors`] {
    return [
      ...(this.stats?.errors ?? []),
      ...(this.stats?.children ?? []).map(c => c.errors).flat(),
    ]
      .flat()
      .filter(Boolean)
  }

  @bind
  public getErrorCount(): number {
    return this.stats?.errorsCount ?? 0
  }

  @bind
  public getWarnings(): StatsCompilation[`warnings`] {
    return [
      ...(this.stats?.warnings ?? []),
      ...(this.stats?.children ?? []).map(c => c.warnings).flat(),
    ].flat()
  }

  @bind
  public getWarningCount(): number {
    return this.stats?.warningsCount ?? 0
  }

  @bind
  public async compilationNotification() {
    this.bud.info(`notification center called`)
    if (!this.notificationsEnabled) {
      this.bud.info(`notification center disabled. exiting.`)
      return
    }

    if (!this.bud?.compiler?.stats) {
      this.bud.warn(
        `notification center called before stats were available. exiting.`,
      )
      return
    }

    this.setStats(this.bud.compiler.stats)
    this.setGroup(this.bud.path())
    this.setTitle(this.bud.label)
    this.setMessage(
      this.hasErrors()
        ? `Compilation failed`
        : this.hasWarnings()
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
      this.openEditor(this.parseErrors(this.stats?.errors))
    } catch (error) {}

    try {
      await this.openBrowser(this.url)
    } catch (error) {}

    try {
      this.notify()
    } catch (error) {}
  }

  /**
   * Open browser in development
   *
   * @public
   */
  @bind
  public async openBrowser(url: string) {
    if (!this.bud.isDevelopment) return
    if (!this.openBrowserEnabled) return
    if (!isString(url)) return

    if (this.browserOpened) return
    this.browserOpened = true

    if (isString(this.browser)) {
      return await open(url, {app: {name: this.browser}})
    }

    return await open(url)
  }

  /**
   * Emit OS notification center notice
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public notify(
    notification?: Notification,
    callback?: NotificationCallback,
  ) {
    if (!this.notificationsEnabled) return
    if (platform() !== `darwin`) {
      this.bud.info(`notifications only currently supported on macos`)
    }

    this.notifier.notify(
      notification ?? {
        title: this.title,
        message: this.message,
        group: this.group,
        open: this.url,
      },
      callback ?? this.notifierCallback,
    )
  }

  /**
   * node notifier callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async notifierCallback(
    ...args: NotificationCallback[`arguments`]
  ): Promise<void> {
    const [_error, response, metadata] = args

    if (response) this.bud.info(`notify response`, response)
    if (metadata) this.bud.info(`notify metadata`, metadata)
  }

  /**
   * Open editor on error
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public openEditor(files?: Array<SourceFile>) {
    if (!this.openEditorEnabled) return
    if (!files || isEmpty(files)) return
    if (!isString(this.editor)) return

    files.map(file =>
      this.bud.info(`opening editor`, this.editor, `w/ file`, file),
    )

    return openEditor(files, {editor: this.editor})
  }

  /**
   * Parse errors from webpack stats
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public parseErrors(errors: Array<StatsError>): Array<SourceFile> {
    if (!errors || !errors.length) return []

    try {
      const parseError = (error: StatsError): SourceFile | undefined => {
        let file: SourceFile[`file`] | undefined

        if (!error.moduleId) return

        const module = this.stats.children
          ?.flatMap(child =>
            child?.modules?.find(module => module.id === error.moduleId),
          )
          ?.pop()

        if (!module) return

        if (module.nameForCondition) {
          file = module.nameForCondition
        } else if (module.name) {
          file = this.bud.path(`@src`, module.name)
        }

        if (!file) return

        return {file}
      }

      return errors?.map(parseError).filter(Boolean)
    } catch (error) {
      this.bud.info(`error parsing errors`, error)
      return []
    }
  }
}
