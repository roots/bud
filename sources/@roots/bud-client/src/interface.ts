var __resourceQuery: string
var __webpack_hash__: string
var bud: {
  hmr?: Record<string, Events>
}
var module: NodeJS.Module & {
  hot?: {
    check?: CallableFunction
    accept?: CallableFunction
    apply?: CallableFunction
    status?: CallableFunction
  }
}

declare module global {
  interface Window {
    bud: typeof bud
    __webpack_public_path__: string
  }
}

declare interface Events extends EventSource {
  timer: NodeJS.Timer
  messages: Set<string>
  lastActivity: Date
  options: Options
  listeners: Set<((ev: MessageEvent) => any) | null>
  checkTimeout(): this
  addMessageListener(fn: (ev: MessageEvent) => unknown): this
}

declare interface Payload {
  action: 'reload' | 'sync' | 'building' | 'built'
  hash?: string
  time?: number
  errors?: Array<{title?: string; message: string}>
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
