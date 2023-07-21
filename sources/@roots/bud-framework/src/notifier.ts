import type {Bud} from '@roots/bud-framework'
import type {
  Notification as NodeNotification,
  NotificationCallback,
} from '@roots/bud-support/node-notifier'

import {platform} from 'node:os'
import {dirname, resolve} from 'node:path'
import {fileURLToPath} from 'node:url'

import isEmpty from '@roots/bud-support/lodash/isEmpty'
import isString from '@roots/bud-support/lodash/isString'
import logger from '@roots/bud-support/logger'
import {open, openEditor} from '@roots/bud-support/open'
import chalk from 'chalk'

const notifierPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  `..`, // bud-framework
  `vendor`,
  `mac.no-index`,
  `roots-notifier.app`,
  `Contents`,
  `MacOS`,
  `roots-notifier`,
)

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
   * Class constructor
   */
  public constructor(public _app: () => Bud) {
    this.make = this.make.bind(this)
    this.notify = this.notify.bind(this)
    this.openBrowser = this.openBrowser.bind(this)
    this.openEditor = this.openEditor.bind(this)
  }

  /**
   * Get bud instance
   */
  public get app(): Bud {
    return this._app()
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

    if (typeof bud.context.editor === `string`) {
      this.editor = bud.context.editor
    } else if (bud.env.has(`BUD_EDITOR`)) {
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
  public openEditor(input: Array<string> | string) {
    if (!this.openEditorEnabled) return

    if (!input || isEmpty(input)) return

    logger.scope(`notifier`, `openEditor`).log(`input received`, input)

    const files = Array.isArray(input) ? input : [input]

    files.map(file =>
      logger.scope(`notifier`).log(`opening`, file, `in`, this.editor),
    )

    if (typeof this.editor === `string`)
      return openEditor(files, {editor: this.editor})
    else return openEditor(files)
  }

  /**
   * True if editor opening is enabled
   */
  public get openEditorEnabled(): boolean {
    const enabled =
      this.app.context.editor === true || // if true, fall back to default behavior
      typeof this.app.context.editor === `string` // if string, opens in that editor

    if (enabled && !this.editor) {
      logger
        .scope(`notifier`, `editor check`)
        .warn(
          chalk.magenta(`\n\nEditor not defined.`),
          `\n\nYou should set an editor using any of the following ENV variables:\n`,
          `\n  - ${chalk.blue(`BUD_EDITOR`)} (bud specific; preferred)`,
          `\n  - ${chalk.blue(`VISUAL`)} (unix standard)`,
          `\n  - ${chalk.blue(`EDITOR`)} (unix standard)`,
          `\n\nAlternatively, use the ${chalk.blue(`--editor`)} flag.`,
        )
    }

    return enabled
  }
}
