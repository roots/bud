import notifier from 'node-notifier'
import React, {useEffect, FunctionComponent} from 'react'
import {Box, Text} from 'ink'

interface WarningProps {
  message: string
}

type WarningComponent = FunctionComponent<WarningProps>

const Warning: WarningComponent = ({message}) => {
  useEffect(() => {
    message &&
      notifier.notify({
        title: 'Warning',
        message,
      })
  }, [message])

  return (
    <Box flexDirection="column">
      {message && <Text wrap="wrap">{message}</Text>}
    </Box>
  )
}

export {Warning}
