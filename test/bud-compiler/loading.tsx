import ava from 'ava'
import {join} from 'path'
import {render} from 'ink-testing-library'
import React from 'react'

import {Bar} from '../../packages/bud-compiler/src/dashboard/components/LoadingBar'

const unit = '█'

ava('Render 0%', t => {
  const {lastFrame} = render(
    <Bar
      backgroundColor="#171c56"
      color={'#545DD7'}
      character="█"
      percent={0}
      columns={100}
    />
  )

  t.deepEqual(lastFrame(), '')
})

ava('Render 10%', t => {
  const {lastFrame} = render(
    <Bar
      backgroundColor="#171c56"
      color={'#545DD7'}
      character="█"
      percent={0.1}
      columns={10}
    />
  )

  t.deepEqual(lastFrame(), '█')
})

ava('Render 50%', t => {
  const {lastFrame} = render(
    <Bar
      backgroundColor="#171c56"
      color={'#545DD7'}
      character="█"
      percent={.5}
      columns={10}
    />
  )

  t.true(lastFrame() === '█████')
})

ava('Render 100%', t => {
  const {lastFrame} = render(
    <Bar
      backgroundColor="#171c56"
      color={'#545DD7'}
      character="█"
      percent={1}
      columns={10}
    />
  )

  t.true(lastFrame() === '██████████')
})
