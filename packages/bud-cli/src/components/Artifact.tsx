import React, {useEffect, FunctionComponent} from 'react'
import {Box, useApp} from 'ink'

import Assets from './Assets'
import Errors from './Errors'
import Warnings from './Warnings'
import BuildInfo from './BuildInfo'
import {Compilation} from '../hooks/useCompilation'

interface ArtifactInterface {
  stats: Compilation['stats']
  progress: Compilation['progress']
  width: number
}

const Artifact: FunctionComponent<ArtifactInterface> = ({
  stats,
  progress,
  width,
}) => {
  const app = useApp()

  useEffect(() => {
    stats?.assets?.length > 0 &&
      progress?.percentage == 1 &&
      app.exit()
  }, [stats])

  return (
    <Box width={width} flexDirection="column">
      <Box display={stats?.assets?.length > 0 ? 'flex' : 'none'}>
        <Assets assets={stats?.assets} />
      </Box>

      <Box display={stats?.errors?.length > 0 ? 'flex' : 'none'}>
        <Errors errors={stats.errors} />
      </Box>

      <Box
        display={stats?.warnings?.length > 0 ? 'flex' : 'none'}>
        <Warnings warnings={stats.warnings} />
      </Box>

      <Box display={progress?.percentage >= 1 ? 'flex' : 'none'}>
        <BuildInfo stats={stats} />
      </Box>
    </Box>
  )
}

export {Artifact}
