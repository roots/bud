import React, {FunctionComponent} from 'react'
import {Text} from 'ink'

interface IndicatorProps {
  emitted: boolean
}

const Indicator: FunctionComponent<IndicatorProps> = ({emitted}) => (
  <Text color={emitted ? '#545DD7' : '#6C758F'}>⦿ </Text>
)

export {Indicator as default}
