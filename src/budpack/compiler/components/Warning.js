import notifier from 'node-notifier'
import React, {useEffect} from 'react'
import {Box, Text} from 'ink'

/**
 * Warning
 *
 * @prop {object} error
 */
const Warning = ({message}) => {
  useEffect(() => {
    message &&
      notifier.notify({
        title: 'Warning',
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

export default Warning
