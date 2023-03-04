import {
  BlockConfiguration,
  getBlockType,
  registerBlockType,
  unregisterBlockType,
} from '@wordpress/blocks'

import type * as Filter from './filter.js'
import * as blockFilter from './filter.js'
import type {Style} from './style.js'
import * as blockStyle from './style.js'
import type {Variant} from './variation.js'
import * as blockVariant from './variation.js'

export interface Props extends BlockConfiguration<Record<string, any>> {
  name: string
  filters?: Record<string, Record<string, Filter.Fn>>
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

  Object.entries(filters)?.map(([hook, filterRecords]) =>
    Object.entries(filterRecords).map(([filterName, callback]) => {
      filterName = filterName.startsWith(name)
        ? filterName
        : `${name}/${filterName}`

      blockFilter.register({hook, name: filterName, callback})
    }),
  )
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

  Object.entries(filters)?.map(([hook, records]) =>
    Object.entries(records).map(([filterName, callback]) => {
      filterName = filterName.startsWith(name)
        ? filterName
        : `${name}/${filterName}`

      blockFilter.unregister({hook, name: filterName, callback})
    }),
  )
}
