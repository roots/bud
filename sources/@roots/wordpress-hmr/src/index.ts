export * as blocks from './blocks.js'
export * as cache from './cache.js'
export * as editor from './editor.js'
export * as formats from './formats.js'
export * as plugins from './plugins.js'

export interface ContextFactory {
  (): __WebpackModuleApi.RequireContext
}

export interface AcceptCallback {
  (
    id: string | number,
    context: () => __WebpackModuleApi.RequireContext,
  ): void
}

export interface RegisterFn {
  (getContext: ContextFactory, accept: AcceptCallback): void
}
