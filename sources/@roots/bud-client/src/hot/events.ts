/* eslint-disable no-console */

export const injectEvents = (
  eventSource: new (path: string) => EventSource,
) => {
  /**
   * EventSource wrapper
   *
   * @remarks
   * wraps EventSource in a function to allow for
   * mocking in tests
   */
  return class Events extends eventSource {
    /**
     * Registered listeners
     *
     * @public
     */
    public listeners: Set<Listener> = new Set<Listener>()

    /**
     * Class constructor
     *
     * @remarks
     * Singleton interface, so this is private.
     *
     * @public
     */
    private constructor(
      public options: Partial<Options> & {name: string; path: string},
    ) {
      super(options.path)

      this.onopen = this.onopen.bind(this)
      this.onmessage = this.onmessage.bind(this)
      this.addListener = this.addListener.bind(this)
    }

    /**
     * Singleton constructor
     *
     * @public
     */
    public static make(
      options: Partial<Options> & {name: string; path: string},
    ): Events {
      if (typeof window.bud.hmr[options.name] === `undefined`)
        Object.assign(window.bud.hmr, {
          [options.name]: new Events(options),
        })

      return window.bud.hmr[options.name]
    }

    /**
     * EventSource `onopen` handler
     * @public
     */
    public override onopen = function () {}

    /**
     * EventSource `onmessage` handler
     * @public
     */
    public override onmessage = async function (payload: MessageEvent) {
      if (!payload?.data || payload.data == `\uD83D\uDC93`) {
        return
      }

      try {
        const data = JSON.parse(payload.data)
        if (!data) return

        await Promise.all(
          [...this.listeners].map(async listener => {
            return await listener(data)
          }),
        )
      } catch (ex) {}
    }

    /**
     * EventSource `addMessageListener` handler
     * @public
     */
    public addListener(listener: Listener): this {
      this.listeners.add(listener)
      return this
    }
  }
}
