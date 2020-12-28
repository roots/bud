import {React, Box, Text} from '@roots/bud-support'
import {Bar} from './Bar'

import type {UseProgress} from '../../hooks/useProgress'
import type {Styles} from '@roots/ink-use-style'

export function Progress({
  progress,
  bounds,
  col,
  colors,
}: {
  progress: UseProgress.Progress
  bounds: Styles['bounds']
  col: Styles['col']
  colors: Styles['colors']
}): JSX.Element {
  const labelMax = 5
  const barMax = Math.min(
    Math.floor(bounds.width - labelMax),
    bounds.width,
  )

  return (
    <Box display={'flex'} width={col(12)} flexDirection={'row'}>
      <Box width={labelMax}>
        <Text>
          {progress.percentage.display}
          {''}
        </Text>
      </Box>

      <Bar
        maxWidth={barMax}
        backgroundColor="none"
        colors={[colors.primary, colors.primaryAlt]}
        percent={progress.percentage.decimal}
      />
    </Box>
  )
}
