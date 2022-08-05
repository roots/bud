/* eslint-disable no-console */

/**
 * HMR EventSource
 *
 * @public
 */
export class Events extends EventSource {
  /**
   * Timer (for timeout)
   * @public
   */
  public timer: NodeJS.Timer

  /**
   * Last activity (for timeout)
   * @public
   */
  public lastActivity: Date = new Date()

  /**
   * Registered listeners
   * @public
   */
  public listeners: Array<((ev: MessageEvent) => any) | null> = []

  /**
   * Class constructor
   *
   * @remarks
   * Singleton interface, so this is private.
   */
  private constructor(public options: Options) {
    super(options.path)

    this.onopen = this.onopen.bind(this)
    this.onmessage = this.onmessage.bind(this)
    this.onerror = this.onerror.bind(this)

    this.checkTimeout = this.checkTimeout.bind(this)
    this.timer = setInterval(this.checkTimeout, options.timeout / 2)
    this.addMessageListener = this.addMessageListener.bind(this)
  }

  /**
   * Singleton constructor
   * @public
   */
  public static make = (options: Options): Events => {
    if (!window.bud) window.bud = {hmr: {}}

    if (!window.bud.hmr[options.path]) {
      window.bud.hmr[options.path] = new Events(options)
    }

    return window.bud.hmr[options.path]
  }

  /**
   * EventSource `onopen` handler
   * @public
   */
  public onopen = function (this: Events, ev?: Event) {
    console.log('[bud] connected')
    this.lastActivity = new Date()
  }

  /**
   * EventSource `onmessage` handler
   * @public
   */
  public onmessage = function (payload: MessageEvent) {
    this.lastActivity = new Date()
    if (!payload) return

    if (!this.listeners?.length || !payload) return

    this.listeners?.forEach(listener =>
      typeof listener === 'function' ? listener(payload) : null,
    )
  }

  /**
   * EventSource `onerror` handler
   * @public
   */
  public onerror = function (this: Events, ev?: Event) {
    clearInterval(this.timer)
    this.close()
    setTimeout(() => Events.make(this.options), this.options.timeout)
  }

  /**
   * EventSource `addMessageListener` handler
   * @public
   */
  public addMessageListener(fn: (ev: MessageEvent) => unknown) {
    this.listeners.push(fn)
  }

  /**
   * Check if timed out
   * @public
   */
  public checkTimeout() {
    // @ts-ignore
    if (new Date() - this.lastActivity > this.options.timeout) {
      this.onerror()
    }
  }
}
