import type {Bud} from '@roots/bud-framework'

export interface watch {
  (
    /**
     * Watched files
     */
    ...files: Array<string | Array<string>>
  ): Bud
}

export const watch: watch = function (...input) {
  const app = this as Bud

  app.hooks.on(`dev.watch.files`, files =>
    input.flat().reduce((files, file) => files.add(file), files),
  )

  return app
}
