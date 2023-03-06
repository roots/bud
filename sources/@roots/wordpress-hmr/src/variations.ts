import * as editor from './editor.js'
import type {RegisterFn} from './index.js'
import * as api from './variation.js'

export const register: RegisterFn = (getContext, accept) =>
  editor.load({getContext, accept, api})
