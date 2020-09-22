import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'
import Bar from './Bar'

type ProgressComponentProps = {
  progress?: {
    percentage?: number
    msg?: string
  }
}

const Progress: FunctionComponent<ProgressComponentProps> = ({
  progress,
}) => (
  <Box flexDirection="column" minHeight={1}>
    {progress?.percentage && (
      <Box flexDirection="row">
        <Box width={6}>
          <Text wrap="truncate">
            {Math.round(progress?.percentage * 100)}%
            {progress?.percentage < 1 ? ' ' : ''}
          </Text>
        </Box>

        <Bar
          backgroundColor="none"
          color="#545DD7"
          character="█"
          percent={progress?.percentage ?? 0}
        />

        <Box height="1">
          <Text wrap="truncate-start" color="#6C758F">
            {progress?.msg ?? ' '}
          </Text>
        </Box>
      </Box>
    )}
  </Box>
)

export {Progress as default}
