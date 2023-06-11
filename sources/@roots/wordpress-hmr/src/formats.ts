import type {RegisterFn} from './index.js'

import * as editor from './editor.js'
import * as api from './format.js'

export const register: RegisterFn = (getContext, accept) =>
  editor.load({accept, api, getContext})
