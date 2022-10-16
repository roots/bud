/* eslint-disable no-console */

type Listener = ((ev: MessageEvent) => any) | null

export default (EventSource: new (...args: any[]) => EventSource) => {
  /**
   * HMR EventSource
   *
   * @public
   */
  return class Events extends EventSource {
    /**
     * Current hash
     * @public
     */
    public currentHash: string

    /**
     * Messages
     */
    public messages: Set<string> = new Set()

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
    private constructor(
      public options: Partial<Options> & {path: string},
    ) {
      super(options.path)

      this.onopen = this.onopen.bind(this)
      this.onmessage = this.onmessage.bind(this)
      this.addMessageListener = this.addMessageListener.bind(this)
    }

    /**
     * Singleton constructor
     * @public
     */
    public static make(
      options: Partial<Options> & {path: string},
    ): Events {
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
    public onopen = async function (ev?: Event) {
      console.log(`[bud] connected`)
    }

    /**
     * EventSource `onmessage` handler
     * @public
     */
    public onmessage = async function (payload: MessageEvent) {
      // @ts-ignore
      if (!payload) return

      this.payload = JSON.parse(payload.data)

      this.payload?.action === `reload` &&
        this.options.reload &&
        window.location.reload()

      if (this.payload?.hash) {
        if (this.messages.has(this.payload?.hash)) return
        this.currentHash = this.payload?.hash
        this.messages.add(this.currentHash)
      }

      if (this.messages.size <= 1) return

      await Promise.all(
        [...this.listeners].map(async listener => await listener(payload)),
      )
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
  }
}
