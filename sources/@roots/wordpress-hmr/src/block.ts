import type * as Filter from '@roots/wordpress-hmr/filter'
import type {Style} from '@roots/wordpress-hmr/style'
import type {Variant} from '@roots/wordpress-hmr/variation'
import type {BlockConfiguration} from '@wordpress/blocks'

import * as blockStyle from '@roots/wordpress-hmr/style'
import {filterCallback} from '@roots/wordpress-hmr/utility'
import * as blockVariant from '@roots/wordpress-hmr/variation'
import {
  getBlockType,
  registerBlockType,
  unregisterBlockType,
} from '@wordpress/blocks'

export interface Props extends BlockConfiguration<Record<string, any>> {
  filters?: Filter.KeyedFilters
  name: string
  styles?: Array<Omit<Style, 'block'>>
  variations?: Array<Omit<Variant, 'block'>>
}

/**
 * Register block
 */
export const register = ({
  filters = {},
  name,
  styles,
  variations,
  ...settings
}: Props) => {
  getBlockType(name) && unregister({filters, name, styles, variations})
  registerBlockType(name, settings)

  styles?.map(style => {
    blockStyle.register({block: name, ...style})
  })
  variations?.map(variation =>
    blockVariant.register({block: name, ...variation}),
  )
  filterCallback(filters, name, (filter, api) => api.register(filter))
}

/**
 * Unregister block
 */
export const unregister = ({
  filters,
  name,
  styles,
  variations,
}: Pick<Props, `filters` | `name` | `styles` | `variations`>) => {
  unregisterBlockType(name)

  styles?.map(style => blockStyle.unregister({block: name, ...style}))
  variations?.map(variation =>
    blockVariant.unregister({block: name, ...variation}),
  )
  filterCallback(filters, name, (filter, api) => api.unregister(filter))
}
