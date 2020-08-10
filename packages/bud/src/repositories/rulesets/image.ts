import type {Bud} from '../types'
import {uses} from './uses'

const image = (bud: Bud) => ({
  test: bud.patterns.get('image'),
  use: [uses.file(bud)],
})

export {image}
