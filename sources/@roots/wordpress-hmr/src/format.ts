import {
  registerFormatType,
  unregisterFormatType,
} from '@wordpress/rich-text'

import * as editor from './editor.js'

export const register = ({name, settings}) =>
  registerFormatType(name, settings)

export const unregister = ({name}) => unregisterFormatType(name)

export const load = (getContext, callback) =>
  editor.load({
    getContext,
    callback,
    register,
    unregister,
  })
