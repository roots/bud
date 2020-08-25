import ava from 'ava'
import {join} from 'path'
import {render} from 'ink-testing-library'
import React from 'react'

import {BuildInfo} from '../../packages/bud-compiler/src/dashboard/components/BuildInfo'

ava('Render', t => {
  const props = {
    build: {
      percentage: .1,
      hash: '🚨',
      time: 1000,
    },
    width: 100,
  }

  const expectation = (`\n10%   █████████`)

  const {lastFrame} = render(
    <BuildInfo {...props} />
  )

  t.deepEqual(lastFrame(), expectation)
})

ava('Render with negative percentage complete', t => {
  const props = {
    build: {
      percentage: -1,
      hash: '🚨',
      time: 1000,
    },
    width: 100,
  }

  const expectation = (``)

  const {lastFrame} = render(
    <BuildInfo {...props} />
  )

  t.deepEqual(lastFrame(), expectation)
})

ava('Render with 50% completion', t => {
  const props = {
    build: {
      percentage: .5,
      hash: '🚨',
      time: 1000,
    },
    width: 100,
  }

  const expectation = (`\n50%   ██████████████████████████████████████████████`)

  const {lastFrame} = render(
    <BuildInfo {...props} />
  )

  t.deepEqual(lastFrame(), expectation)
})

ava('Render with 100% completion', t => {
  const props = {
    build: {
      percentage: 1,
      hash: '🚨',
      time: 1000,
    },
    width: 100,
  }

  const expectation = (`\nBuild 🚨. Finished in 1s.\n100%  ████████████████████████████████████████████████████████████████████████████████████████████`)

  const {lastFrame} = render(
    <BuildInfo {...props} />
  )

  t.deepEqual(lastFrame(), expectation)
})
