import React from 'react'
import {Text} from 'ink'

interface IndicatorProps {
  active: boolean
  primary?: string
  secondary?: string
}

const Indicator: React.FunctionComponent<IndicatorProps> = ({
  active,
  primary,
  secondary,
}) => {
  return (
    <Text color={active ? primary : secondary}>⦿{'  '}</Text>
  )
}

export {Indicator as default, Indicator}
