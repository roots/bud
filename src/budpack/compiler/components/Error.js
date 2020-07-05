import notifier from 'node-notifier'
import React, {useEffect} from 'react'
import {Box, Text} from 'ink'

/**
 * Error
 *
 * @prop {object} error
 */
const Error = ({message}) => {
  useEffect(() => {
    message &&
      notifier.notify({
        title: 'Build error',
        message,
      })
  }, [message])

  return !message ? (
    []
  ) : (
    <Box
      paddingLeft={1}
      paddingRight={1}
      flexDirection="column">
      <Text wrap="wrap">{message}</Text>
    </Box>
  )
}

export default Error
