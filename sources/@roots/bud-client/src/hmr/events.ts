/* eslint-disable no-console */

type Listener = ((ev: MessageEvent) => any) | null

/**
 * HMR EventSource
 *
 * @public
 */
export class Events extends EventSource {
  /**
   * Messages
   */
  public messages: Set<string> = new Set()

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
  public listeners: Set<Listener> = new Set<Listener>()

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
  public static make(options: Options): Events {
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
    console.log(`[bud] connected`)
    this.lastActivity = new Date()
  }

  /**
   * EventSource `onmessage` handler
   * @public
   */
  public onmessage = function (payload: MessageEvent) {
    this.lastActivity = new Date()
    if (!payload) return

    try {
      const {hash} = JSON.parse(payload.data)
      if (!hash || this.messages.has(hash)) return

      this.messages.add(hash)

      if (this.messages.size <= 1 || !this.listeners?.size) return
      else
        [...this.listeners]
          ?.filter(listener => typeof listener === `function`)
          .forEach(listener => listener(payload))
    } catch (err) {}
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
  public addMessageListener(
    callback: (ev: MessageEvent) => unknown,
  ): this {
    this.listeners.add(callback)
    return this
  }

  /**
   * Check if timed out
   * @public
   */
  public checkTimeout(): this {
    // @ts-ignore
    if (new Date() - this.lastActivity > this.options.timeout) {
      this.onerror()
    }

    return this
  }
}
