import React, {FunctionComponent} from 'react'
import {Box} from 'ink'

import BuildInfo from './BuildInfo'
import Prettier from './Prettier'

interface DashboardProps {
  progress: any
  stats: any
}

const Dashboard: FunctionComponent<DashboardProps> = ({
  progress,
  stats,
}) => {
  return (
    <Box flexDirection="column">
      {progress && (
        <Prettier parser={'json'}>
          {JSON.stringify(progress)}
        </Prettier>
      )}
      {stats && <BuildInfo stats={stats} />}
    </Box>
  )
}

export {Dashboard as default}
