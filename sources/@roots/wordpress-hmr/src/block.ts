import {
  BlockConfiguration,
  BlockStyle,
  getBlockType,
  registerBlockStyle,
  registerBlockType,
  unregisterBlockStyle,
  unregisterBlockType,
} from '@wordpress/blocks'
import {addFilter, removeFilter} from '@wordpress/hooks'

import type * as Filter from './filter.js'

export interface Props extends BlockConfiguration<Record<string, any>> {
  name: string
  filters: Filter.Registry
  styles: Array<BlockStyle>
}

/**
 * Register block
 */
export const register = ({name, filters, styles, ...settings}: Props) => {
  getBlockType(name) && unregister({name, filters, styles})
  registerBlockType(name, settings)

  styles?.map(style => registerBlockStyle(name, style))

  filters &&
    Object.entries(filters)?.map(([hookName, registrations]) =>
      Object.entries(registrations).map(([namespace, handler]) => {
        addFilter(hookName, namespace, handler)
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
}: Pick<Props, `name` | `filters` | `styles`>) => {
  unregisterBlockType(name)

  styles?.map(style => unregisterBlockStyle(name, style.name))

  filters &&
    Object.entries(filters)?.map(([hookName, registrations]) =>
      Object.keys(registrations).map(namespace => {
        removeFilter(hookName, namespace)
      }),
    )
}
