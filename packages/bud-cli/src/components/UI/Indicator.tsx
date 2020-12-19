import {React, FunctionComponent, Text} from '@roots/bud-support'

interface IndicatorProps {
  active: boolean
  primary?: string
  secondary?: string
}

const Indicator: FunctionComponent<IndicatorProps> = ({
  active,
  primary = '#545DD7',
  secondary = '#6C758F',
}) => {
  return (
    <Text color={active ? primary : secondary}>⦿{'  '}</Text>
  )
}

export {Indicator as default, Indicator}
