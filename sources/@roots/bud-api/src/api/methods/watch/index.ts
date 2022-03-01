import type {Framework, Server} from '@roots/bud-framework'

export interface watch {
  (
    files: Server.Configuration['watch']['files'],
    options?: Server.Configuration['watch']['options'],
  ): Framework
}

export const watch: watch = function (files, options = {}) {
  const ctx = (this.root as Framework) ?? (this as Framework)

  files = Array.isArray(files) ? files : [files]

  ctx.hooks
    .on('dev.watch.files', hookValue => [...(hookValue ?? []), ...files])
    .hooks.on('dev.watch.options', hookValue => ({
      ...(hookValue ?? {}),
      ...(options ?? {}),
    }))

  return ctx
}
