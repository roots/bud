import test from 'ava'
import {bud} from '@roots/bud'
import {react} from '@roots/bud-react'

test('has expected defaults', t => {
  bud.use([react])

  t.true(bud.options.get('webpack.resolve.extensions').includes('.jsx'))
})
