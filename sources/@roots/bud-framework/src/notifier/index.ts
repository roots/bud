import type {Bud} from '@roots/bud-framework'
import type {
  Notification as NodeNotification,
  NotificationCallback,
} from '@roots/bud-support/node-notifier'

import {platform} from 'node:os'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import isEmpty from '@roots/bud-support/isEmpty'
import isString from '@roots/bud-support/isString'
import isUndefined from '@roots/bud-support/isUndefined'
import logger from '@roots/bud-support/logger'
import {open, openEditor} from '@roots/bud-support/open'

/**
 * Path to roots-notifier binary
 *
 * @description
 * Used to open notifications on macOS
 */
const notifierPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  `..`, // lib
  `..`, // bud-framework
  `vendor`,
  `mac.no-index`,
  `roots-notifier.app`,
  `Contents`,
  `MacOS`,
  `roots-notifier`,
)

/**
 * Notification
 */
interface Notification extends NodeNotification {
  actions?: string | string[]
  closeLabel?: string
  contentImage?: string
  dropdownLabel?: string
  group?: string
  open?: string | URL
  reply?: boolean
  sound?: boolean | string
  subtitle?: string
  timeout?: false | number
}

/**
 * Notifier
 */
export class Notifier {
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
  public declare browserOpened: boolean

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
   * Class constructor
   */
  public constructor(public _app: () => Bud) {
    this.make = this.make.bind(this)
    this.notify = this.notify.bind(this)
    this.openBrowser = this.openBrowser.bind(this)
    this.openEditor = this.openEditor.bind(this)
    this.browserOpened = false
  }

  /**
   * Get bud instance
   */
  public get app(): Bud {
    return this._app()
  }

  /**
   * Editor to open on error
   */
  public get editor(): boolean | string {
    if (!isUndefined(this.app.context.editor)) {
      return this.app.context.editor
    }

    if (this.app.env.has(`BUD_EDITOR`)) {
      return this.app.env.get(`BUD_EDITOR`)
    }

    if (this.app.env.has(`VISUAL`)) {
      return this.app.env.get(`VISUAL`)
    }

    if (this.app.env.has(`EDITOR`)) {
      return this.app.env.get(`EDITOR`)
    }

    return false
  }

  /**
   * Make notifier
   */
  public async make(bud: Bud) {
    if (this.notificationsEnabled) {
      const {NotificationCenter} = await import(
        `@roots/bud-support/node-notifier`
      )

      this.notificationCenter =
        platform() !== `darwin`
          ? new NotificationCenter()
          : new NotificationCenter({customPath: notifierPath})
    }
  }

  /**
   * True if notifications are enabled
   */
  public get notificationsEnabled(): boolean {
    if (this.app?.context.notify === true) {
      logger.scope(`notifier`).log(`Notifications enabled`)
      return true
    }

    if (
      this.app?.context.notify === undefined &&
      platform() === `darwin`
    ) {
      logger.scope(`notifier`).log(`Notifications enabled (macos default)`)
      return true
    }

    return false
  }

  /**
   * Emit OS notification center notice
   */
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
  public async openBrowser(url: string) {
    if (!this.app.isDevelopment) return
    if (!isString(url)) return

    if (this.browserOpened) return
    this.browserOpened = true

    if (isString(this.browser)) {
      return await open(url, {app: {name: this.browser}})
    }

    return await open(url)
  }

  /**
   * Open editor on error
   */
  public openEditor(input: Array<string> | string) {
    if (!this.openEditorEnabled) return
    if (!input || isEmpty(input)) return

    const files = Array.isArray(input) ? input : [input]

    if (isString(this.editor))
      return openEditor(files, {editor: this.editor})

    return openEditor(files)
  }

  /**
   * If --editor flag is passed
   */
  public get openEditorEnabled(): boolean {
    return (
      !isUndefined(this.app.context.editor) &&
      this.app.context.editor !== false
    )
  }
}