export type ModuleId = __WebpackModuleApi.ModuleId

export type HotNotifierInfo = __WebpackModuleApi.HotNotifierInfo

export type AcceptOptions = __WebpackModuleApi.AcceptOptions

export interface CheckCallback {
  (err: Error, accepted: Array<ModuleId>): void
}

export interface ApplyCallback {
  (err: Error, updated: Array<ModuleId>): void
}
