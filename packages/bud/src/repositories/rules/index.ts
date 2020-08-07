import type {Bud} from '../types'
import {babel} from './babel'

const rules = [
  bud => babel(bud),
]

export {rules}
