import type {Framework, Server} from '@roots/bud-framework'

export interface watch {
  (
    files: Server.DevConfiguration['watch']['files'],
    options?: Server.DevConfiguration['watch']['options'],
  ): Framework
}

/**
 * Set files that, when modified, will force the browser to reload.
 *
 * @remarks
 * Modifying these files will cause a full page reload, even in hot mode.
 *
 * @example
 * ```js
 * app.watch(['templates/*.html'])
 * ```
 *
 * @example
 * Set chokidar options as well:
 *
 * ```js
 * app.watch(['templates/*.html'], {
 *   // chokidar options
 * })
 * ```
 *
 * @public
 */
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
