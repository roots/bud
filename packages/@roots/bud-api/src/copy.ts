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
  jobs: {[from: string]: string},
  options?: {[key: string]: any},
) => Framework

export const copy: Copy = function (jobs, options?) {
  Object.entries(jobs).map(([dest, from]: [string, string]) => {
    const fileFormat = this.store.isTrue('options.hash')
      ? this.store.get('options.hashFormat')
      : this.store.get('options.fileFormat')

    this.disk.glob.sync(from).map((from: string) => {
      const pattern = {
        from,
        to: parseOutputOption(dest, fileFormat),
        context: this.subscribe('location/project', 'api/copy'),
      }

      this.publish(
        {
          'extension/webpack-copy-plugin/options/patterns': patterns => [
            ...(patterns ?? []),
            pattern,
          ],
        },
        'api/copy',
      )
    })
  })

  return this
}

/**
 * Parse output option
 */
const parseOutputOption = (
  destination: string,
  fileFormat: string,
): string => {
  if (isEqual(destination, '/')) {
    return fileFormat
  }

  if (isEqual(destination.split('').pop(), '/')) {
    return destination.concat(fileFormat)
  }

  return destination
}
