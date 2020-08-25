import {join} from 'path'
import {render} from 'ink-testing-library'
import React from 'react'

const {Error: ErrorComponent} = require(join(process.cwd(), 'packages/bud-compiler/src/dashboard/components/Errors/Error'))

const ava = require('ava')

ava('works', t => {
  const {lastFrame} = render(
    <ErrorComponent message={'Error test.'}/>
  )

  /**
   * The space in ` Error test.` is important.
   */
  t.true(lastFrame() === ' Error test.')
})
