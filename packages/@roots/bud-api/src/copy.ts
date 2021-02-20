import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework<T> {
    /**
     * ## copy  [💁 Fluent]
     *
     * Copy files during compilation.
     *
     * You may specify paths with a string literal or glob pattern.
     *
     * ### Usage
     *
     * **Copy src/images to dist/images**
     *
     * ```js
     * app.copy({
     *   images: 'src/images/*.{png,gif,jpeg,jpg,webp}'
     * })
     * ```
     */
    copy: Framework.Api.Copy
  }

  namespace Framework.Api {
    export type Copy = (
      this: Framework,
      jobs: {[key: string]: string},
    ) => Framework
  }
}

export const copy: Framework.Api.Copy = function (jobs) {
  Object.entries(jobs).forEach(
    ([to, from]: [string, string]) => {
      this.disk.glob.sync(from).forEach(path => {
        this.extensions
          .get(`copy-webpack-plugin`)
          .mutate(
            'options.patterns',
            (
              patterns: {[key: string]: string}[],
            ): {[key: string]: string}[] => [
              ...patterns,
              {
                context: this.project(),
                from: path,
                to,
              },
            ],
          )
      })
    },
  )

  return this
}
