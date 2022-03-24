import type {Framework} from '@roots/bud-framework'

export interface watch {
  (
    /**
     * Watched files
     */
    ...files: Array<string>
  ): Framework
}

export const watch: watch = function (...input) {
  const app = this as Framework

  input = Array.isArray(input) ? input : [input]
  app.hooks.on('dev.watch.files', files =>
    input.reduce((files, file) => files.add(file), files),
  )

  return app
}
