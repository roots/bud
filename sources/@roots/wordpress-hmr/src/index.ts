import './types.js'

export * as blocks from '@roots/wordpress-hmr/blocks'
export * as cache from '@roots/wordpress-hmr/cache'
export * as editor from '@roots/wordpress-hmr/editor'
export * as formats from '@roots/wordpress-hmr/formats'
export * as plugins from '@roots/wordpress-hmr/plugins'
export * as styles from '@roots/wordpress-hmr/styles'
export * as variations from '@roots/wordpress-hmr/variations'

declare global {
  interface Window {
    roots: {
      register: {
        blocks: (path: string) => void
        filters: (path: string) => void
        formats: (path: string) => void
        plugins: (path: string) => void
        styles: (path: string) => void
      }
    }
  }
}

declare module '@wordpress/data' {
  export function dispatch(namespace: string): any
  export function select(namespace: string): any
}

export interface AfterCallback {
  (changed?: Array<{name: string}>): unknown
}

export interface ContextFactory {
  (): __WebpackModuleApi.RequireContext
}

export interface AcceptCallback {
  (
    id: number | string,
    context: () => __WebpackModuleApi.RequireContext,
  ): void
}

export interface RegisterFn {
  (getContext: ContextFactory, accept: AcceptCallback): void
}
