import type {Framework} from '@roots/bud-framework'
import {useStdin} from 'ink'
import React from 'react'

import {Input} from './input.component'
import {Output} from './output.component'

/**
 * Dashboard display component
 *
 * @public
 */
export const Dashboard = ({tap}: {tap: () => Framework}) => {
  const {isRawModeSupported} = useStdin()
  isRawModeSupported && Input({bud: tap()})
  return <Output tap={tap} />
}
