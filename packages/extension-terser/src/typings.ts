import type {Framework, MaybeCallable} from '@roots/bud-typings'
import type {MinifyOptions} from 'terser'

export type Terser = (
  this: Framework,
  options: {
    /**
     * Test to match files against.
     * @default /\.m?js(\?.*)?$/i
     */
    test?: string | RegExp | Array<string | RegExp>

    /**
     * Files to include.
     * @default undefined
     */
    include?: string | RegExp | Array<string | RegExp>

    /**
     * Files to exclude.
     * @default undefined
     */
    exclude?: string | RegExp | Array<string | RegExp>

    /**
     * Enable/disable multi-process parallel running.
     * Use multi-process parallel running to improve the build speed. Default number of concurrent runs: os.cpus().length - 1.
     * @default true
     */
    parallel?: boolean | number

    /**
     * Terser minify {@link https://github.com/terser/terser#minify-options|options}.
     */
    terserOptions?: MinifyOptions

    /**
     * Whether comments shall be extracted to a separate file, (see details).
     * By default extract only comments using /^\**!|@preserve|@license|@cc_on/i regexp condition and remove remaining comments.
     * If the original file is named foo.js, then the comments will be stored to foo.js.LICENSE.txt.
     * The terserOptions.output.comments option specifies whether the comment will be preserved,
     * i.e. it is possible to preserve some comments (e.g. annotations) while extracting others or even preserving comments that have been extracted
     * @default true
     */
    extractComments?:
      | boolean
      | string
      | RegExp
      | MaybeCallable<boolean | string | RegExp>
  },
) => Framework
