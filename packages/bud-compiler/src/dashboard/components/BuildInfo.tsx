import React, {FunctionComponent} from 'react'
import {Box, Text, Spacer} from 'ink'

interface InfoProps {
  build: any
}

const BuildInfo: FunctionComponent<InfoProps> = ({build}) => (
  <Box
    padding={1}
    flexDirection="column"
    justifyContent="flex-end">
    {build?.time && (
      <Text>Finished in {build?.time / 1000}s.</Text>
    )}
    <Spacer />
    {build?.hash && (
      <Text color="#6C758F">Build {build?.hash}.</Text>
    )}
  </Box>
)

export {BuildInfo}
