import * as editor from './editor.js'
import * as api from './filter.js'
import type {RegisterFn} from './index.js'

export const register: RegisterFn = (getContext, accept) =>
  editor.load({getContext, accept, api})
