/** Modules */
import React from 'react'
import {Box, Text} from 'ink'
import PropTypes from 'prop-types'

/** Application components */
import {Loading} from './Loading'
import {Watching} from './Watching'

/**
 * Build Info
 */
const BuildInfo = ({build, config, width}) => (
  <Box flexDirection="column" paddingTop={1}>
    {build?.percentage == 1 && build?.hash && (
      <Text color="#6C758F" marginTop={1}>
        Build {build?.hash}. Finished in{' '}
        {build?.time / 1000}s.
      </Text>
    )}

    <Loading build={build} width={width} />
    {config?.features?.watching && (
      <Watching config={config} build={build} />
    )}
  </Box>
)

BuildInfo.propTypes = {
  build: PropTypes.object,
  config: PropTypes.object,
  width: PropTypes.number,
}

export {BuildInfo}
