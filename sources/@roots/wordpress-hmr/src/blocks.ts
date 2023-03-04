import {
  getBlockType,
  registerBlockStyle,
  registerBlockType,
  unregisterBlockStyle,
  unregisterBlockType,
} from '@wordpress/blocks'
import {dispatch, select} from '@wordpress/data'
import {addFilter, removeFilter} from '@wordpress/hooks'

import * as editor from './editor.js'

/**
 * Register block
 */
export const register = ({name, filters, styles, ...settings}) => {
  if (getBlockType(name)) {
    unregister({name, filters, styles})
  }

  registerBlockType(name, settings)

  styles?.map(style => registerBlockStyle(name, style))
  filters?.map(({name, namespace, callback}) => {
    addFilter(name, namespace, callback)
  })
}

/**
 * Unregister block
 */
export const unregister = ({name, filters, styles}) => {
  unregisterBlockType(name)

  filters?.map(({hook, namespace}) => {
    removeFilter(hook, namespace)
  })
  styles?.map(style => unregisterBlockStyle(name, style.name))
}

let selected = null

/**
 * Before update
 */
const before = () => {
  selected = select(`core/block-editor`).getSelectedBlockClientId()
  dispatch(`core/block-editor`).clearSelectedBlock()
}

/**
 * After update
 */
const after = (changed?: Array<{name: string}>) => {
  if (!changed?.length) return

  const blocks = select(`core/block-editor`).getBlocks()

  const modified = changed.filter(Boolean).map(module => module.name)

  blocks.forEach(({name, clientId}) => {
    if (modified.includes(name)) {
      dispatch(`core/block-editor`).selectBlock(clientId)
    }
  })

  selected
    ? dispatch(`core/block-editor`).selectBlock(selected)
    : dispatch(`core/block-editor`).clearSelectedBlock()

  selected = null
}

export default (getContext, callback): void => {
  editor.load({
    getContext,
    callback,
    register,
    unregister,
    before,
    after,
  })
}
