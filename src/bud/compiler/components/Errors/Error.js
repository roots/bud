const notifier = require('node-notifier')
const React = require('react')
const {useEffect} = React
const {Box, Text} = require('ink')
const PropTypes = require('prop-types')

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

module.exports = {Error}
