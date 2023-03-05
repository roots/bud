import {
  BlockConfiguration,
  getBlockType,
  registerBlockType,
  unregisterBlockType,
} from '@wordpress/blocks'

import type * as Filter from './filter.js'
import type {Style} from './style.js'
import * as blockStyle from './style.js'
import {filterCallback} from './utility.js'
import type {Variant} from './variation.js'
import * as blockVariant from './variation.js'

export interface Props extends BlockConfiguration<Record<string, any>> {
  name: string
  filters?: Filter.KeyedFilters
  styles?: Array<Omit<Style, 'block'>>
  variations?: Array<Omit<Variant, 'block'>>
}

/**
 * Register block
 */
export const register = ({
  name,
  filters = {},
  styles,
  variations,
  ...settings
}: Props) => {
  getBlockType(name) && unregister({name, filters, styles, variations})
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
  name,
  filters,
  styles,
  variations,
}: Pick<Props, `name` | `filters` | `styles` | `variations`>) => {
  unregisterBlockType(name)

  styles?.map(style => blockStyle.unregister({block: name, ...style}))
  variations?.map(variation =>
    blockVariant.unregister({block: name, ...variation}),
  )
  filterCallback(filters, name, (filter, api) => api.unregister(filter))
}
