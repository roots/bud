import {Styles} from '@roots/ink-use-style'
import {Box, Newline, Text} from 'ink'
import React from 'react'

export interface Props {
  message: string
  file?: string
  colors: [keyof Styles['colors'], keyof Styles['colors']]
  icon: string
}

export const Message = ({
  message,
  file,
  icon,
  colors,
}: Props) => {
  return (
    <Box flexDirection="column">
      <Text>
        <Text color={`${colors[0]}`}>{icon ?? ''}</Text>{' '}
        {file ? `${file}:\n` : ``}
        <Text>{message}</Text>
        <Newline />
      </Text>
    </Box>
  )
}
