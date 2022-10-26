import type {Bud} from '@roots/bud-framework'

export interface watch {
  (
    /**
     * Watched files
     */
    ...files: Array<string> | Array<Array<string>>
  ): Bud
}

export const watch: watch = function (...input) {
  const app = this as Bud

  if (!app.isDevelopment) return app

  const normalized = input.flat()

  app.hooks.on(`dev.watch.files`, files => {
    if (!files) files = new Set()

    normalized.map(file => files.add(file))

    return files
  })

  return app
}
