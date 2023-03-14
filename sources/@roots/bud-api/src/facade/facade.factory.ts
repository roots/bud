import type {Bud} from '@roots/bud-framework'

export interface facade {
  (...args: any[]): Bud
}

export interface factory {
  (app: Bud, name: string): facade
}

export const factory: factory = (app: Bud, name: string): facade =>
  function facade(...args: any[]): Bud {
    app.api.queue.push([name, args])
    return app
  }
