import notifier from 'node-notifier'
import React, {useEffect, FunctionComponent} from 'react'
import {Box, Text} from 'ink'

interface ErrorProps {
  message: string
}

const Error: FunctionComponent<ErrorProps> = ({message}) => {
  useEffect(() => {
    message &&
      notifier.notify({
        title: 'Build error',
        message,
      })
  }, [message])

  return (
    <Box paddingLeft={1} paddingRight={1} flexDirection="column">
      <Text wrap="wrap">{message || ''}</Text>
    </Box>
  )
}

export {Error}
