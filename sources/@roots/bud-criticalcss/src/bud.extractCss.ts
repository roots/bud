import type {Bud} from '@roots/bud-framework'
import type {Options} from '@roots/critical-css-webpack-plugin'

import {generate} from 'critical'
import vinyl from 'vinyl'

export interface extractCss {
  (asset: Array<string>, options?: Options): Bud
}

export const extractCss = function (
  this: Bud,
  assets: Array<string>,
  options: Options = {},
): Bud {
  this.hooks.action(`compiler.done`, async () => {
    options = {
      ...(this.extensions.get(`@roots/bud-criticalcss`).getOptions() ??
        {}),
      ...options,
    }

    try {
      await Promise.all(
        assets.map(async from => {
          const contents = await this.fs.read(from, `buffer`)

          const vfile = new vinyl({
            base: options.base,
            contents,
            path: from,
          })

          const criticalPath = from
            .split(`.`)
            .slice(0, -1)
            .join(``)
            .concat(`.critical.css`)

          const uncriticalPath = from
            .split(`.`)
            .slice(0, -1)
            .join(``)
            .concat(`.uncritical.css`)

          const result = await generate({...options, css: [vfile]})
          if (!result) return

          await this.fs.write(criticalPath, result.css)

          if (options.extract && result.uncritical) {
            await this.fs.write(from, result.uncritical)
          }
          if (!options.extract && result.uncritical) {
            await this.fs.write(uncriticalPath, result.uncritical)
          }
        }),
      )
    } catch (error: unknown) {
      throw error
    }
  })

  return this
}
