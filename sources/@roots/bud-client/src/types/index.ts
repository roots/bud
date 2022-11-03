declare var __resourceQuery: string
declare var __webpack_hash__: string

declare interface Events {
  messages: Set<string>
  options: Partial<Options> & {name: string; path: string}
  currentHash: string
  listeners: Set<((ev: Payload) => any) | null>
  addMessageListener(fn: (ev: Payload) => unknown): this
  onopen: (ev?: Event) => Promise<void>
  onmessage: (ev?: MessageEvent) => Promise<void>
}

declare interface Payload {
  type: `middleware` | __WebpackModuleApi.HotNotifierInfo[`type`]
  action: 'reload' | 'sync' | 'building' | 'built'
  hash?: string
  time?: number
  errors?: Array<Error>
  warnings?: Array<string>
  message?: string
}

declare interface Controller {
  update: (payload: Payload) => void
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
  hmr?: Record<string, Events & EventSource>
}

declare module global {
  interface Window {
    bud: typeof bud
  }
}
