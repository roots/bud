import {join} from 'path'
import {render} from 'ink-testing-library'
import React from 'react'

import {Error} from '../../packages/bud-compiler/src/dashboard/components/Errors/Error'

const ava = require('ava')

ava('works', t => {
  const {lastFrame} = render(
    <Error message={'Error test.'}/>
  )

  t.true(lastFrame() === ' Error test.')
})
