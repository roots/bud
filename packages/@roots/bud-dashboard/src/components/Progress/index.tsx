import {Box} from 'ink'
import React from 'react'

import {Bar} from './Bar'

/**
 * Progress component
 *
 * @public
 */
export const Progress = ({progress, theme}) => {
  return (
    <Box flexDirection="row">
      <Bar
        character={'▉'}
        maxWidth={theme.bounds.width - 10}
        colors={[theme.colors.primary, theme.colors.primaryAlt]}
        percent={progress[0]}
      />
    </Box>
  )
}
