import {React, FunctionComponent, Box} from '@roots/bud-support'
import {Bar} from './Bar'

import type {Styles} from '@roots/ink-use-style'
import type {Compiler} from '@roots/bud-typings'

interface Props {
  progress: Compiler.Progress
  bounds: Styles['bounds']
  col: Styles['col']
  colors: Styles['colors']
  hasErrors: boolean
}

export const Progress: FunctionComponent<Props> = ({
  progress,
  bounds,
  colors,
  hasErrors,
}) => {
  return !hasErrors && progress?.decimal ? (
    <Box display={'flex'} flexDirection={'row'}>
      <Bar
        maxWidth={bounds.width - 4}
        colors={[colors.primary, colors.primaryAlt]}
        percent={progress?.decimal}
      />
    </Box>
  ) : null
}
