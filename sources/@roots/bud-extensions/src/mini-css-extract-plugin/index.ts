import type {Options} from '@roots/bud-support/mini-css-extract-plugin'

import {
  Extension,
  type StrictPublicExtensionApi,
} from '@roots/bud-framework/extension'
import {
  label,
  options,
  plugin,
  production,
} from '@roots/bud-framework/extension/decorators'
import {Plugin} from '@roots/bud-support/mini-css-extract-plugin'
import Value from '@roots/bud-support/value'

interface ExtOpts
  extends StrictPublicExtensionApi<MiniCssExtract, Options> {}

/**
 * Mini CSS Extract Plugin configuration
 */
@label(`@roots/bud-extensions/mini-css-extract-plugin`)
@plugin(Plugin)
@options<Options>({
  attributes: undefined,
  filename: Value.make(({relPath}) => relPath(`css`, `@name.css`)),
})
@production
export default class MiniCssExtract extends Extension<Options, Plugin> {
  public declare attributes: ExtOpts[`attributes`]
  public declare filename: ExtOpts[`filename`]

  public declare getAttributes: ExtOpts[`getAttributes`]
  public declare getFilename: ExtOpts[`getFilename`]

  public declare setAttributes: ExtOpts[`setAttributes`]
  public declare setFilename: ExtOpts[`setFilename`]
}
