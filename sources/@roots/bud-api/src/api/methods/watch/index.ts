import type {Framework} from '@roots/bud-framework'

export interface watch {
  (
    /**
     * Watched files
     */
    ...files: Array<string> | [Array<string>]
  ): Framework
}

export const watch: watch = function (...input) {
  const app = this as Framework

  let paths: Array<string> = Array.isArray(input[0])
    ? input[0]
    : (input as Array<string>)

  app.hooks.on('dev.watch.files', files =>
    paths.reduce((files, file) => files.add(file), files),
  )

  return app
}
