import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'
import {Bar} from './LoadingBar'

type ProgressComponentProps = {
  build?: {
    percentage: number
    message: string
  }
}

const Progress: FunctionComponent<ProgressComponentProps> = ({
  build,
}) => (
  <Box flexDirection="column">
    <Box flexDirection="row">
      <Box width={6}>
        <Text wrap="truncate">
          {Math.round(build?.percentage * 100)}%
          {build?.percentage < 1 ? '  ' : ' '}
        </Text>
      </Box>

      <Bar
        backgroundColor="#171c56"
        color={'#545DD7'}
        character="█"
        percent={build?.percentage ?? 0.01}
      />
    </Box>
    <Box height="1">
      <Text wrap="truncate-start" color="#6C758F">
        {build?.message ?? ' '}
      </Text>
    </Box>
  </Box>
)

export {Progress as default}
