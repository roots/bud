/* eslint-disable no-console */

type Listener = ((ev: Payload) => any) | null

export const injectEvents = (
  eventSource: new (path: string) => EventSource,
) => {
  return class Events extends eventSource {
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
      public options: Partial<Options> & {name: string; path: string},
    ) {
      super(options.path)

      this.onopen = this.onopen.bind(this)
      this.onmessage = this.onmessage.bind(this)
      this.addMessageListener = this.addMessageListener.bind(this)
    }

    /**
     * Singleton constructor
     *
     * @public
     */
    public static make(
      options: Partial<Options> & {name: string; path: string},
    ): Events {
      if (!window.bud) window.bud = {hmr: {}}

      if (!window.bud.hmr[options.name])
        window.bud.hmr[options.name] = new Events(options)

      return window.bud.hmr[options.name]
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

      try {
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
          [...this.listeners].map(
            async listener => await listener(this.payload),
          ),
        )
      } catch (e) {}
    }

    /**
     * EventSource `addMessageListener` handler
     * @public
     */
    public addMessageListener(
      payloadListener: (ev: Payload) => unknown,
    ): this {
      this.listeners.add(payloadListener)
      return this
    }
  }
}

export default injectEvents
