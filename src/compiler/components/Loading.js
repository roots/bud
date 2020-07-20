import React from 'react'
import {Box, Text} from 'ink'
import ProgressBar from 'ink-progress-bar'
import PropTypes from 'prop-types'

/**
 * Loading (Progress Plugin)
 */
const Loading = ({build, width}) =>
  build?.percentage > 0 && build?.percentage < 1 ? (
    <Box
      maxWidth={width}
      textWrap="truncate"
      flexDirection="row">
      <Text bgcolor={'#171c56'}>
        <Text width={6}>
          {Math.round(build?.percentage * 100)}%
          {build?.percentage < 1 ? '  ' : ' '}
        </Text>
      </Text>

      <Text color={'#545DD7'}>
        <ProgressBar
          character="█"
          percent={build?.percentage ?? 0.01}
        />
      </Text>
    </Box>
  ) : (
    []
  )

Loading.propTypes = {
  build: PropTypes.object,
  width: PropTypes.number,
}

export {Loading}
