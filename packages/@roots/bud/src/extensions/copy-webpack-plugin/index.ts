import {CopyWebpackPlugin} from './interface'
import Plugin from 'copy-webpack-plugin'
import {sync} from 'globby'

const CopyWebpackPluginExtension: CopyWebpackPlugin = {
  /**
   * @property name
   */
  name: 'copy-webpack-plugin',

  /**
   * @property options
   */
  options: () => ({
    patterns: [],
    noErrorOnMissing: true,
  }),

  /**
   * @property make
   */
  make: options => new Plugin(options.all()),

  /**
   * @property when
   */
  when(_app, options) {
    return (
      options.has('patterns') &&
      options.get('patterns')?.length > 0
    )
  },

  /**
   * @property api
   */
  api: () => ({
    assets(jobs) {
      jobs.map(from => {
        sync(from).map((from: string) => {
          const dirName = from.split('/')[
            from.split('/').length - 2
          ]

          const format = this.store.isTrue('hash')
            ? this.store.get('hashFormat')
            : this.store.get('fileFormat')

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
    },
  }),
}

// prettier-ignore
const {name, options, make, when, api} = CopyWebpackPluginExtension

/**
 * @exports
 */
export default CopyWebpackPluginExtension
export {name, options, make, when, api}
