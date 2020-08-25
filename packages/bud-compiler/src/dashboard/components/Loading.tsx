import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'
import {Bar} from './LoadingBar'

type LoadingComponentProps = {
  build?: {
    percentage: number
  }
}

/**
 * Loading (Progress Plugin)
 */
const Loading: FunctionComponent<LoadingComponentProps> = ({build}) =>
  build?.percentage > 0 ? (
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
  ) : (
    <Box></Box>
  )

export {Loading}
