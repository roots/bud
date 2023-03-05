import {dispatch, select} from '@wordpress/data'

import * as api from './block.js'
import * as editor from './editor.js'
import type {RegisterFn} from './index.js'

let selected = null

const before = () => {
  selected = select(`core/block-editor`).getSelectedBlockClientId()
  dispatch(`core/block-editor`).clearSelectedBlock()
}

const after = (changed?: Array<{name: string}>) => {
  if (!changed?.length) return

  select(`core/block-editor`)
    .getBlocks()
    .forEach(({name, clientId}) => {
      changed
        ?.filter(module => module?.name)
        .map(module => module.name)
        .includes(name) &&
        dispatch(`core/block-editor`).selectBlock(clientId)
    })

  selected
    ? dispatch(`core/block-editor`).selectBlock(selected)
    : dispatch(`core/block-editor`).clearSelectedBlock()

  selected = null
}

export const register: RegisterFn = (getContext, accept) =>
  editor.load({api, getContext, accept, before, after})
