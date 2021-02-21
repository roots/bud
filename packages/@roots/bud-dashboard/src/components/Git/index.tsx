import {React, Box, FunctionComponent} from '@roots/bud-support'
import {Branch} from './Branch'
import {Status} from './Status'
import {Head} from './Head'
import {useGit} from '../../hooks/useGit'

export const Git: FunctionComponent<{colors}> = ({colors}) => {
  const git = useGit()

  return (
    <Box flexDirection="row" justifyContent="space-between">
      <Branch git={git} colors={colors} />
      <Head git={git} colors={colors} />
      <Status git={git} colors={colors} />
    </Box>
  )
}
