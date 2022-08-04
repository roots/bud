import type {Bud} from '@roots/bud-framework'

/**
 * @internal
 */
export interface facade {
  (...args: any[]): Bud
}

/**
 * @internal
 */
export interface factory {
  (name: string): facade
}

/**
 * @internal
 */
export const factory: factory = (name: string): facade =>
  function facade(...args: any[]): Bud {
    this.api.queue.push([name, args])
    return this
  }
