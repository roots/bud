import type {
  Notification as NodeNotification,
  NotificationCallback,
} from '@roots/bud-support/node-notifier'

import {type Bud} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'
import isEmpty from '@roots/bud-support/lodash/isEmpty'
import isString from '@roots/bud-support/lodash/isString'
import {open, openEditor} from '@roots/bud-support/open'
import {platform} from 'node:os'

import {notifierPath} from './notifierPath.js'

interface Notification extends NodeNotification {
  actions?: string | string[] | undefined
  closeLabel?: string | undefined
  contentImage?: string | undefined
  dropdownLabel?: string | undefined
  group?: string
  open?: string | undefined | URL
  reply?: boolean | undefined
  sound?: boolean | string | undefined
  subtitle?: string | undefined
  timeout?: false | number | undefined
}

/**
 * Notifier
 */
export class Notifier extends Service {
  /**
   * Browser to open on error
   */
  public browser: boolean | string

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
   * Editor to open on error
   */
  public editor: boolean | string

  /**
   * Node-notifier notification center instance
   */
  public notificationCenter: {
    notify(
      notification?: Notification,
      callback?: NotificationCallback,
    ): Notifier[`notificationCenter`]
  }

  /**
   * {@link Service.boot}
   */
  @bind
  public override async boot(bud: Bud) {
    if (this.notificationsEnabled) {
      const {NotificationCenter} = await import(
        `@roots/bud-support/node-notifier`
      )
      this.notificationCenter =
        platform() !== `darwin`
          ? new NotificationCenter()
          : new NotificationCenter({customPath: notifierPath})
    }

    if (bud.env.has(`BUD_EDITOR`)) {
      this.editor = bud.env.get(`BUD_EDITOR`)
    } else if (bud.env.has(`VISUAL`)) {
      this.editor = bud.env.get(`VISUAL`)
    } else if (bud.env.has(`EDITOR`)) {
      this.editor = bud.env.get(`EDITOR`)
    }
  }

  /**
   * True if notifications are enabled
   */
  public get notificationsEnabled(): boolean {
    return this.app?.context.notify === true
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
        group: this.app.label,
        title: this.app.label,
        ...notification,
      },
      callback,
    )
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

  /**
   * True if browser opening is enabled
   */
  public get openBrowserEnabled(): boolean {
    return this.app?.context.browser === true
  }

  /**
   * Open editor on error
   */
  @bind
  public openEditor(input: Array<string> | string) {
    if (!this.openEditorEnabled) return
    if (!isString(this.editor)) return
    if (!input || isEmpty(input)) return

    const files = Array.isArray(input) ? input : [input]

    files.map(file => this.app.info(`opening`, file, `in`, this.editor))

    return openEditor(files, {editor: this.editor})
  }

  /**
   * True if editor opening is enabled
   */
  public get openEditorEnabled(): boolean {
    return this.app?.context.editor === true
  }
}
