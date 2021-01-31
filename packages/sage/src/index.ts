import './interface'

export {isStatic, json, api, preflight} from './source'

import {sage} from './sage/base'
import {sage as purged} from './sage/purged'
import {sage as tailwind} from './sage/tailwind'

export {sage, sage as default, purged, tailwind}
