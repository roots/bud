import React from 'react'
import Spinner from 'ink-spinner'
import {Box, Text, Newline} from 'ink'
import {Bar} from './Bar'
import {useStyle} from '@roots/ink-use-style'
import type {UseProgress} from '../../hooks/useProgress'

declare namespace Progress {
  export type Component = (
    props: UseProgress.Progress,
  ) => JSX.Element
}

const Progress: Progress.Component = ({percentage, msg}) => {
  const {col, ctx, bounds, colors} = useStyle()

  const labelMax = 5
  const barMax = Math.min(
    Math.floor(bounds.width - labelMax),
    bounds.width,
  )

  return (
    <Box
      display={'flex'}
      width={col(12)}
      flexDirection={'column'}>
      <Box flexDirection={ctx(['column', 'row'])}>
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

      {msg ? (
        <Box>
          <Text>
            <Newline />
            <Text color="green">
              <Spinner type="dots" />
            </Text>
            {` ${msg}`}
          </Text>
        </Box>
      ) : null}
    </Box>
  )
}

export {Progress as default}
