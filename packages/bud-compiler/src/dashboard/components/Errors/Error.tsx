import notifier from 'node-notifier'
import React, {useEffect, FunctionComponent} from 'react'
import {Box, Text} from 'ink'

interface ErrorProps {
  message: string
}

const Generic = ({error}) => {
  return (
    <Box flexDirection="column">
      <Text wrap="wrap">{error || ''}</Text>
    </Box>
  )
}

const Error: FunctionComponent<ErrorProps> = ({message}) => {
  useEffect(() => {
    message &&
      notifier.notify({
        title: 'Build error',
        message,
      })
  }, [message])

  if (message.includes(':')) {
    message = message.split(':').slice(1).join('')
  }

  return <Generic error={message} />
}

export {Error}
