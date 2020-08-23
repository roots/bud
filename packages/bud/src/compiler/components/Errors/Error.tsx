import notifier from 'node-notifier'
import React, {useEffect} from 'react'
import {Box, Text} from 'ink'
import PropTypes from 'prop-types'

/**
 * Error
 *
 * @prop {string} message
 * @return {PropTypes.ReactComponentLike}
 */
const Error = ({message}) => {
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

Error.propTypes = {
  message: PropTypes.string,
}

export {Error}
