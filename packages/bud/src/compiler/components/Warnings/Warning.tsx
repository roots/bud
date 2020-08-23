import notifier from 'node-notifier'
import React, {useEffect, FunctionComponent} from 'react'
import {Box, Text} from 'ink'
import PropTypes from 'prop-types'

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

  return !message ? (
    <Box></Box>
  ) : (
    <Box paddingLeft={1} paddingRight={1} flexDirection="column">
      <Text wrap="wrap">{message}</Text>
    </Box>
  )
}

export {Warning}
