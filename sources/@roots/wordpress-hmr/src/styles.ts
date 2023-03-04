import * as editor from './editor.js'
import type {RegisterFn} from './index.js'
import * as api from './style.js'

export const register: RegisterFn = (getContext, accept) =>
  editor.load({getContext, accept, api})
