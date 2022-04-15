export interface Modules {
  [key: `extension.${string}`]: any
}

export namespace Modules {
  export type HookMap = Modules
}
