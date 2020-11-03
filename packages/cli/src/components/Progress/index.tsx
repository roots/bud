import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'
import Bar from './Bar'

import useAppStyles from '../../hooks/useAppStyles'

type ProgressComponentProps = {
  percentage: {
    decimal: number
    display: string
  }
  msg: string
}

const Progress: FunctionComponent<ProgressComponentProps> = ({
  percentage,
  msg,
}) => {
  const {col, ctx, bounds} = useAppStyles()
  const labelMax = ctx([col(12), col(1) / 2])
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
            {'  '}
          </Text>
        </Box>

        <Bar
          maxWidth={barMax}
          backgroundColor="none"
          color="#545DD7"
          percent={percentage.decimal}
        />
      </Box>

      <Box>
        <Text>{msg}</Text>
      </Box>
    </Box>
  )
}

export {Progress as default}
