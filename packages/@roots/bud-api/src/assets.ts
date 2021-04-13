import {Framework} from '@roots/bud-framework'

declare module '@roots/bud-framework' {
  interface Framework {
    /**
     * ## assets  [💁 Fluent]
     *
     * Copy static assets during compilation.
     *
     * You may specify paths with a string literal or glob pattern.
     *
     * ### Usage
     *
     * **Copy src/images to dist/images**
     *
     * ```js
     * app.assets(['src/images'])
     * ```
     */
    copy: Framework.Api.Assets
  }

  namespace Framework.Api {
    export type {Assets}
  }
}

type Assets = (this: Framework, from: string[]) => Framework

export const assets: Assets = function (jobs) {
  jobs.map(from => {
    this.disk.glob.sync(from).map((from: string) => {
      const dirName = from.split('/')[from.split('/').length - 2]

      const format = this.store.isTrue('options.hash')
        ? this.store.get('options.hashFormat')
        : this.store.get('options.fileFormat')

      const pattern = {
        from,
        to: `${dirName}/${format}.[ext]`,
      }

      this.extensions
        .get('copy-webpack-plugin')
        .set('options', copy => ({
          ...copy,
          patterns: [...(copy.patterns ?? []), pattern],
        }))
    })
  })

  return this
}
