import type {Bud} from '../types'
import {uses} from './uses'

const font = (bud: Bud) => ({
  test: bud.patterns.get('font'),
  use: [uses.file(bud)],
})

export {font}
