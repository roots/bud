import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework<T> {
    /**
     * ## app.copy  [💁 Fluent]
     *
     * Copy static assets to your output directory.
     *
     * You may specify paths with a string literal or glob pattern.
     *
     * ### Usage
     *
     * **Copy all files from `src/images`**
     *
     * ```js
     * app.copy('images/*')
     * ```
     *
     * **Copy all files from a path outside of `app.src`**
     *
     * ```js
     * app.copy('images/*', {
     *   context: app.project('assets')
     * })
     * ```
     *
     * **Copy all files to a path outside of `app.dist`**
     *
     * ```js
     * app.copy('images/*', {
     *   to: '/app/cdn/media'
     * })
     * ```
     */
    copy: Framework.Api.Copy
  }

  namespace Framework.Api {
    export type Copy = (
      this: Framework,
      from: string | Array<string>,
      options?: Copy.Options,
    ) => Framework

    namespace Copy {
      export interface Options {
        to: string
        context: string
        [key: string]: any
      }
    }
  }
}

export const copy: Framework.Api.Copy = function (
  from,
  options,
) {
  const copy = (from: string, options?) =>
    this.extensions
      .get(`copy-webpack-plugin`)
      .mutate('options.patterns', patterns => [
        ...patterns,
        {
          from,
          context: options?.context ?? this.src(),
          to: options?.to ?? this.dist(),
          ...options,
        },
      ])

  if (Array.isArray(from)) {
    from.forEach(job => copy(job, options ?? null))
    return this
  }

  copy(from, options)

  return this
}
