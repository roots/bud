import type {BudImageminExtension} from '../extension.js'
import type {Minimizer} from '../index.js'

export interface encode {
  (
    this: BudImageminExtension,
    key: string,
    options: {},
  ): BudImageminExtension
}

/**
 * ## bud.imagemin.encode
 *
 * Allows you to set the encoder options for a given filetype.
 *
 * @see {@link https://bud.js.org/extensions/bud-imagemin/encode}
 */
export function encode(
  this: BudImageminExtension,
  key: string,
  options: Record<string, any>,
): BudImageminExtension {
  const [minimizer, encoder] = this.encoders.get(key)

  const transformer = (minimizer: Minimizer): Minimizer => ({
    ...minimizer,
    options: {
      ...minimizer?.options,
      encodeOptions: {
        ...minimizer?.options?.encodeOptions,
        [encoder]: options,
      },
    },
  })

  return this.configure(minimizer, transformer)
}
