import {platform} from 'node:os'

import {Service} from '@roots/bud-framework'
import {bind} from '@roots/bud-support/decorators'
import isEmpty from '@roots/bud-support/lodash/isEmpty'
import isString from '@roots/bud-support/lodash/isString'
import type {
  Notification as NodeNotification,
  NotificationCallback,
} from '@roots/bud-support/node-notifier'
import {open, openEditor, SourceFile} from '@roots/bud-support/open'
import type {StatsCompilation} from '@roots/bud-support/webpack'

import {notifierPath} from './notifierPath.js'

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
export class Notifier extends Service {
  public browser: string | boolean
  public stats?: StatsCompilation | undefined
  public editor: string | boolean
  public notificationCenter: {
    notify(
      notification?: Notification,
      callback?: NotificationCallback,
    ): Notifier[`notificationCenter`]
  }

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

  /**
   * True if notifications are enabled
   */
  public get notificationsEnabled(): boolean {
    return this.app.isCLI() && this.app?.context.args.notify === true
  }

  /**
   * True if editor opening is enabled
   */
  public get openEditorEnabled(): boolean {
    return this.app.isCLI() && this.app?.context.args.editor === true
  }

  /**
   * True if browser opening is enabled
   */
  public get openBrowserEnabled(): boolean {
    return this.app.isCLI() && this.app?.context.args.browser === true
  }

  @bind
  public override async register() {
    if (this.notificationsEnabled) {
      const {NotificationCenter} = await import(
        `@roots/bud-support/node-notifier`
      )
      this.notificationCenter =
        platform() !== `darwin`
          ? new NotificationCenter()
          : new NotificationCenter({customPath: notifierPath})
    }

    if (this.app.env.has(`BUD_EDITOR`)) {
      this.editor = this.app.env.get(`BUD_EDITOR`)
    } else if (this.app.env.has(`VISUAL`)) {
      this.editor = this.app.env.get(`VISUAL`)
    } else if (this.app.env.has(`EDITOR`)) {
      this.editor = this.app.env.get(`EDITOR`)
    }
  }

  /**
   * Emit OS notification center notice
   */
  @bind
  public notify(
    notification: Notification,
    callback?: NotificationCallback,
  ) {
    if (!this.notificationsEnabled) return

    this.notificationCenter.notify(
      {
        title: this.app.label,
        group: this.app.label,
        ...notification,
      },
      callback,
    )
  }

  /**
   * Open editor on error
   */
  @bind
  public openEditor(input?: Array<SourceFile> | SourceFile) {
    if (!this.openEditorEnabled) return
    if (!input || isEmpty(input)) return
    if (!isString(this.editor)) return

    const files = Array.isArray(input) ? input : [input]

    files.map(file => this.app.info(`opening`, file, `in`, this.editor))

    return openEditor(files, {editor: this.editor})
  }

  /**
   * Open browser in development
   */
  @bind
  public async openBrowser(url: string) {
    if (!this.app.isDevelopment) return
    if (!this.openBrowserEnabled) return
    if (!isString(url)) return

    if (this.browserOpened) return
    this.browserOpened = true

    if (isString(this.browser)) {
      return await open(url, {app: {name: this.browser}})
    }

    return await open(url)
  }
}
