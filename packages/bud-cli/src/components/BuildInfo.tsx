import React, {FunctionComponent} from 'react'
import {Box, Text, Spacer} from 'ink'
import {Stats} from 'webpack'

interface InfoProps {
  stats: Stats.ToJsonOutput
}

const BuildInfo: FunctionComponent<InfoProps> = ({stats}) => (
  <Box flexDirection="column" justifyContent="flex-end">
    {stats?.time && (
      <Text>Finished in {stats.time / 1000}s.</Text>
    )}

    <Spacer />

    {stats?.hash && (
      <Text color="#6C758F">Build {stats.hash}.</Text>
    )}
  </Box>
)

export {BuildInfo as default}
