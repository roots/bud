/** Modules */
import React from 'react'
import {Box, Text} from 'ink'
import PropTypes from 'prop-types'

/** Application components */
import {Loading} from './Loading'

/**
 * Build Info
 */
const BuildInfo = ({build, width}) => (
  <Box flexDirection="column" paddingTop={1}>
    {build?.percentage == 1 && build?.hash && (
      <Text color="#6C758F">
        Build {build?.hash}. Finished in {build?.time / 1000}s.
      </Text>
    )}

    <Loading build={build} />
  </Box>
)

BuildInfo.propTypes = {
  build: PropTypes.object,
  bud: PropTypes.object,
  width: PropTypes.number,
}

export {BuildInfo}
