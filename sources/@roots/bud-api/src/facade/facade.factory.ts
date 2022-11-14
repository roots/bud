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
  (app: Bud, name: string): facade
}

/**
 * @internal
 */
export const factory: factory = (app: Bud, name: string): facade =>
  function facade(...args: any[]): Bud {
    app.api.queue.push([name, args])
    return app
  }
