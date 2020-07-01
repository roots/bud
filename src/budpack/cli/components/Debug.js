import React, {useEffect} from 'react'
import {Box, Text, useFocus} from 'ink'
import PropTypes from 'prop-types'
import highlight from 'cli-highlight'

const Debug = ({actions, config, options}) => {
  const {isFocused} = useFocus({autoFocus: false})
  useEffect(() => {
    actions?.setFocus({debug: isFocused})
  }, [isFocused])

  return (
    <Box
      display={
        isFocused && options?.debug ? 'flex' : 'none'
      }
      flexDirection="column">
      <Text>
        {highlight(
          JSON.stringify({config, options}, null, 4),
        )}
      </Text>
    </Box>
  )
}

Debug.propTypes = {
  actions: PropTypes.object,
  config: PropTypes.object,
  options: PropTypes.object,
}

export default Debug
