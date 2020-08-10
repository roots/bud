import type {Bud} from '../types'
import {uses} from './uses'

const babel = (bud: Bud) => ({
  test: bud.patterns.get('js'),
  exclude: bud.patterns.get('vendor'),
  use: [uses.babel(bud)],
})

export {babel}
