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

  app.hooks.on(`dev.watch.files`, files => {
    if (!files) files = new Set()
    input.flat().forEach((file: string) => files.add(file))
    return files
  })

  return app
}
