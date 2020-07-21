const notifier = require('node-notifier')
const React = require('react')
const {useEffect} = React
const {Box, Text} = require('ink')
const PropTypes = require('prop-types')

/**
 * Warning (single)
 *
 * @prop {string} message
 * @return {PropTypes.ReactComponentLike}
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

Warning.propTypes = {
  message: PropTypes.string,
}

module.exports = {Warning}
