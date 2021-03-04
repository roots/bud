import {Framework} from '@roots/bud-framework'
import {isEqual} from 'lodash'

declare module '@roots/bud-framework' {
  interface Framework {
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
    export type {Copy}
  }
}

type Copy = (
  this: Framework,
  jobs: {[key: string]: string},
  options?: {[key: string]: any},
) => Framework

export const copy: Copy = function (jobs, options) {
  Object.entries(jobs).map(([to, from]) => {
    this.disk.glob.sync(from).forEach(path => {
      this.extensions.mutate(
        'webpack-copy-plugin.options.patterns',
        (
          patterns: {[key: string]: string}[],
        ): {[key: string]: string}[] => {
          const rootStyle = isEqual(to, '/')
            ? '[name].[contenthash].[ext]'
            : null

          const dirStyle = isEqual(to.split('').pop(), '/')
            ? to.concat('[name].[contenthash].[ext]')
            : ''

          const pattern = {
            from: path,
            context: this.project(),
            to: rootStyle ?? dirStyle ?? to,
            ...(options ?? {}),
          }

          return [...patterns, pattern]
        },
      )
    })
  })

  return this
}
