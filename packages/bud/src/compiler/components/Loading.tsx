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
  build?.percentage > 0 && build?.percentage < 1 ? (
    <Box flexDirection="row">
      <Text backgroundColor={'#171c56'}>
        <Box width={6}>
          <Text wrap="truncate">
            {Math.round(build?.percentage * 100)}%
            {build?.percentage < 1 ? '  ' : ' '}
          </Text>
        </Box>
      </Text>

      <Text color={'#545DD7'}>
        <Bar character="█" percent={build?.percentage ?? 0.01} />
      </Text>
    </Box>
  ) : (
    <Box></Box>
  )

export {Loading}
