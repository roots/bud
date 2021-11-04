import {Box, Text} from 'ink'
import React, {useEffect, useState} from 'react'

import {Bar} from './Bar'

/**
 * Progress component
 *
 * @public
 */
export const Progress = ({progress, theme}) => {
  const [number, setNumber] = useState(0)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (!progress) return
    const formattedMessage = progress[1].replace(/\[.*\]\s/, '')

    setNumber(progress[0])
    setMessage(formattedMessage)
  }, [progress])

  return (
    <Box flexDirection="column">
      <Bar
        character={'▉'}
        maxWidth={theme.bounds.width - 10}
        colors={[theme.colors.primary, theme.colors.primaryAlt]}
        percent={number}
      />

      <Box marginTop={1}>
        <Text>{message}</Text>
      </Box>
    </Box>
  )
}
