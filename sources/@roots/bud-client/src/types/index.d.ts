declare var __resourceQuery: string
declare var __webpack_hash__: string

interface Listener {
  (event: Payload): void
}

declare interface Events {
  options: Partial<Options> & {name: string; path: string}
  listeners: Set<Listener>
  addListener(fn: Listener): this
  onopen: (ev?: Event) => void
  onmessage: (ev?: MessageEvent) => void
}

declare interface Payload {
  name: string
  type: `middleware` | __WebpackModuleApi.HotNotifierInfo[`type`]
  action: 'reload' | 'sync' | 'building' | 'built'
  hash?: string
  time?: number
  errors?: Array<Record<string, any>>
  warnings?: Array<string>
  message?: string
  modules?: Record<string, Array<string>>
}

declare interface Controller {
  update: (payload: Partial<Payload>) => void
}

declare interface Options {
  timeout: number
  reload: boolean
  debug: boolean
  log: boolean
  name: string
  path: string
  indicator: boolean
  overlay: boolean
}

declare var bud: {
  current?: Record<string, string>
  controllers?: Array<Controller>
  hmr?: Record<string, Events & EventSource>
  listeners?: Record<string, Listener>
}

declare module global {
  interface Window {
    bud: typeof bud
  }
}
