declare module global {
  interface Window {
    bud: typeof bud
    __webpack_public_path__: string
  }
}

var __resourceQuery: string
var __webpack_hash__: string
var bud: {
  hmr?: Record<string, HMREvents>
}
var module: NodeJS.Module & {
  hot?: {
    check?: CallableFunction
    accept?: CallableFunction
    apply?: CallableFunction
    status?: CallableFunction
  }
}

declare interface HMREvents extends EventSource {
  timer: NodeJS.Timer
  lastActivity: Date
  options: Options
  listeners: Array<((ev: MessageEvent) => any) | null>
  checkTimeout(): void
  addMessageListener(fn: (ev: MessageEvent) => unknown): void
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
