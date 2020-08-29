import {bud, Bud} from '../../packages/bud'
import ava from 'ava'

ava('Bud has server property', t => {
  t.true(bud.hasOwnProperty('server'))
})
