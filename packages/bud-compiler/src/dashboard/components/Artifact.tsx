import React, {useEffect, FunctionComponent} from 'react'
import {Box, useApp} from 'ink'

import Assets from './Assets'
import Errors from './Errors'
import Warnings from './Warnings'
import Progress from './Progress'

import {BuildInfo} from './BuildInfo'

interface ArtifactInterface {
  build: any
  width: number
}

const Artifact: FunctionComponent<ArtifactInterface> = ({
  build,
  width,
}) => {
  const app = useApp()

  useEffect(() => {
    build?.assets?.length > 0 &&
      build?.percentage == 1 &&
      app.exit()
  }, [build])

  return (
    <Box width={width} flexDirection="column">
      <Box display={build?.percentage < 1 ? 'flex' : 'none'}>
        <Progress build={build} />
      </Box>

      <Box display={build?.assets?.length > 0 ? 'flex' : 'none'}>
        <Assets assets={build?.assets} />
      </Box>

      <Box display={build?.errors?.length > 0 ? 'flex' : 'none'}>
        <Errors errors={build.errors} />
      </Box>

      <Box
        display={build?.warnings?.length > 0 ? 'flex' : 'none'}>
        <Warnings warnings={build.warnings} />
      </Box>

      <Box display={build?.percentage >= 1 ? 'flex' : 'none'}>
        <BuildInfo build={build} />
      </Box>
    </Box>
  )
}

export {Artifact}
