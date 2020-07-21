const React = require('react')
const {useEffect} = React
const {Box, Text, useFocus} = require('ink')
const PropTypes = require('prop-types')
const highlight = require('cli-highlight')

/**
 * Debug display
 */
const Debug = ({actions, config}) => {
  const {isFocused} = useFocus({autoFocus: false})
  useEffect(() => {
    actions?.setFocus({debug: isFocused})
  }, [isFocused])

  return (
    <Box
      display={
        isFocused && config?.features?.debug
          ? 'flex'
          : 'none'
      }
      flexDirection="column">
      <Text>
        {highlight(JSON.stringify({config}, null, 4))}
      </Text>
    </Box>
  )
}

Debug.propTypes = {
  actions: PropTypes.object,
  config: PropTypes.object,
}

module.exports = {Debug}
