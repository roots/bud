import notifier from 'node-notifier'
import React, {useEffect} from 'react'
import {Box, Text, Newline} from 'ink'

/**
 * Error
 */
const Error = ({error}) => {
  useEffect(() => {
    error &&
      notifier.notify({
        title: 'Build error.',
        message: error || '',
      })
  }, [error])

  return !error ? (
    []
  ) : (
    <Box
      paddingLeft={1}
      paddingRight={1}
      flexDirection="column">
      <Text wrap="wrap">{error}</Text>
    </Box>
  )
}

export default Error
