import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'

declare interface Props {
  children: any
  label: string
  color?: string
  labelColor?: string
  marginBottom?: number
  borderStyle?: 'single' | 'double' | 'classic' | 'round'
}

export const Module: FunctionComponent<Props> = ({
  children,
  label,
  color = 'white',
  labelColor = color,
  marginBottom = 1,
  borderStyle = 'single',
}) => (
  <Box flexDirection="column" marginBottom={marginBottom}>
    <Text color={labelColor}>{label}</Text>
    <Box
      borderStyle={borderStyle}
      borderColor={color}
      paddingX={1}
      flexDirection="column">
      {children}
    </Box>
  </Box>
)
