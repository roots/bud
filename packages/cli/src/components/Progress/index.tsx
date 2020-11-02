import React, {FunctionComponent} from 'react'
import {Box, Text} from 'ink'
import Bar from './Bar'

import useAppStyles from '../../hooks/useAppStyles'

type ProgressComponentProps = {
  progress: {
    percentage: number
    msg: string
  }
}

const Progress: FunctionComponent<ProgressComponentProps> = ({
  progress,
}) => {
  const {col, ctx, is} = useAppStyles()

  return (
    <Box
      display={is(progress.percentage < 100, 'flex', 'none')}
      width={col(12)}
      flexDirection={ctx(['column'])}>
      <Box flexDirection={ctx(['column', 'row'])}>
        <Box width={ctx([col(12), col(2), col(1)])}>
          <Text>{progress.percentage}%</Text>
        </Box>

        <Bar
          backgroundColor="none"
          color="#545DD7"
          percent={progress.percentage}
        />
      </Box>

      <Box>
        <Text>{progress.msg}</Text>
      </Box>
    </Box>
  )
}

export {Progress as default}
