import type {Framework} from '@roots/bud-framework'

export interface watch {
  (
    /**
     * Watched files
     */
    ...files: Array<string | Array<string>>
  ): Framework
}

export const watch: watch = function (...input) {
  const app = this as Framework

  app.hooks.on('dev.watch.files', watching =>
    input.reduce((files, file) => {
      Array.isArray(file) ? file.map(f => files.add(f)) : files.add(file)
      return files
    }, watching),
  )

  return app
}
