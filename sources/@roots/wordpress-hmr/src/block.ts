import {
  BlockInstance,
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
export const register = ({name, settings, filters, styles}) => {
  registerBlockType(name, settings)

  styles?.map(style => registerBlockStyle(name, style))

  filters?.forEach(({name, namespace, callback}) => {
    addFilter(name, namespace, callback)
  })
}

/**
 * Unregister block
 */
export const unregister = ({name, filters, styles}) => {
  unregisterBlockType(name)

  filters?.forEach(({hook, namespace}) => {
    removeFilter(hook, namespace)
  })

  styles?.forEach(style => unregisterBlockStyle(name, style.name))
}

let selected = null

/**
 * Before update
 */
const before = () => {
  selected = select('core/block-editor').getSelectedBlockClientId()
  dispatch('core/block-editor').clearSelectedBlock()
}

/**
 * After update
 */
const after = (changed?: Array<{name: string}>) => {
  if (!changed?.length) return

  const allBlocks = select(
    'core/block-editor',
  ).getBlocks() as Array<BlockInstance>
  const modifiedBlocks = changed.map(module => module.name)

  allBlocks.forEach(({name, clientId}) => {
    if (modifiedBlocks.includes(name)) {
      dispatch('core/block-editor').selectBlock(clientId)
    }
  })

  selected
    ? dispatch('core/block-editor').selectBlock(selected)
    : dispatch('core/block-editor').clearSelectedBlock()
  selected = null
}

export const load = (getContext, callback): void => {
  const blockContextProps = {register, unregister, before, after}
  editor.load({getContext, callback, ...blockContextProps})
}
