import React from 'react'
import {useStdin} from 'ink'

import {RawDashboard} from './RawDashboard'
import {NonRawDashboard} from './NonRawDashboard'

import type {Framework} from '@roots/bud-framework'

const Dashboard = ({bud}: {bud: Framework}) => {
  const {isRawModeSupported} = useStdin()

  return isRawModeSupported ? (
    <RawDashboard bud={bud} />
  ) : (
    <NonRawDashboard bud={bud} />
  )
}

export {Dashboard}
