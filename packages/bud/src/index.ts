import {Bud} from './Bud'
import {providers} from './providers'
import * as api from '@roots/bud-api'

const bud: Bud = new Bud({api, providers})

export {bud, Bud}
