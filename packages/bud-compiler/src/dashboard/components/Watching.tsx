import React from 'react'
import {Box, Text} from 'ink'
import Spinner from 'ink-spinner'

/**
 * Watch mode indicator
 * @prop {object} bud
 * @prop {object} build
 * @return {PropTypes.ReactElementLike}
 */
const Watching = () => (
  <Box flexDirection="row">
    <Text color="#28a745">
      <Text>
        <Spinner type="dots" />
      </Text>
      {' Watching'}
    </Text>
  </Box>
)

export {Watching}
