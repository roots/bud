import type {RegisterFn} from '@roots/wordpress-hmr'

import * as editor from '@roots/wordpress-hmr/editor'
import * as api from '@roots/wordpress-hmr/plugin'

export const register: RegisterFn = (getContext, accept) =>
  editor.load({accept, api, getContext})
