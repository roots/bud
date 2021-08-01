import {Styles} from '@roots/ink-use-style'
import {Box} from 'ink'
import * as React from 'react'

import {Bar} from './Bar'

export const Progress = ({
  progress,
  theme,
  mode,
}: {
  mode: string
  progress: any
  theme: Styles
}) => {
  return (
    <Box flexDirection="row">
      <Box>
        <Bar
          character={'▉'}
          maxWidth={theme.bounds.width - 10}
          colors={[
            theme.colors.primary,
            theme.colors.primaryAlt,
          ]}
          percent={progress[0]}
        />
      </Box>
    </Box>
  )
}
