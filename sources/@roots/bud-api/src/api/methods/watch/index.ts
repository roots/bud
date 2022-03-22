import type {Framework} from '@roots/bud-framework'
import {chokidar} from '@roots/bud-support'

export interface watch {
  (
    /**
     * Watched files
     */
    files: Array<string>,
    /**
     * Watcher options
     */
    options?: chokidar.WatchOptions,
  ): Framework
}

export const watch: watch = function (files, options = {}) {
  const ctx = this as Framework

  files = Array.isArray(files) ? files : [files]

  ctx.hooks
    .on('dev.watch.files', fileSet => {
      files.forEach(file => fileSet.add(file))
      return fileSet
    })
    .hooks.on('dev.watch.options', hookValue => ({
      ...(hookValue ?? {}),
      ...(options ?? {}),
    }))

  return ctx
}
