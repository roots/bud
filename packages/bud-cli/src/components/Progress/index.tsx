import React from 'react'
import {Box, Text} from 'ink'
import {Bar} from './Bar'
import {useStyle} from '@roots/ink-use-style'
import type {UseProgress} from '../../hooks/useProgress'

declare namespace Progress {
  export type Component = (
    props: UseProgress.Progress,
  ) => JSX.Element
}

const Progress: Progress.Component = ({percentage}) => {
  const {col, bounds, colors} = useStyle()

  const labelMax = 5
  const barMax = Math.min(
    Math.floor(bounds.width - labelMax),
    bounds.width,
  )

  return (
    <Box display={'flex'} width={col(12)} flexDirection={'row'}>
      <Box width={labelMax}>
        <Text>
          {percentage.display}
          {''}
        </Text>
      </Box>

      <Bar
        maxWidth={barMax}
        backgroundColor="none"
        color={colors.primary}
        percent={percentage.decimal}
      />
    </Box>
  )
}

export {Progress as default}
