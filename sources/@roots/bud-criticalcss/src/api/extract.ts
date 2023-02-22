import type {Bud} from '@roots/bud-framework'
import type {Options} from '@roots/critical-css-webpack-plugin'
import * as critical from 'critical'
import vinyl from 'vinyl'

export interface extractCss {
  (asset: Array<string>, options?: Options): Bud
}

export const extractCss = function (
  assets: Array<string>,
  options?: Options,
): Bud {
  this.hooks.action(`compiler.close`, async () => {
    options = {
      ...(this.critical.getOptions() ?? {}),
      ...(options ?? {}),
    }

    try {
      await Promise.all(
        assets.map(async from => {
          const contents = await this.fs.read(from, `buffer`)

          const vfile = new vinyl({
            base: options.base,
            path: from,
            contents,
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

          await critical
            .generate({...options, css: [vfile]})
            .then(async ({css, uncritical}) => {
              await this.fs.write(criticalPath, css)
              options.extract
                ? await this.fs.write(from, uncritical)
                : await this.fs.write(uncriticalPath, uncritical)
            })
        }),
      )
    } catch (e) {
      throw new Error(e)
    }
  })

  return this
}
